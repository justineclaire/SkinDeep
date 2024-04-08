import showlink from "./prodlinks.js";
import fs from "fs";

function getProducts() {
    return new Promise((resolve, reject) => {
        const q = "SELECT Name, Brand FROM `products`";
        db.query(q, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getlinks() {
    try {
        const file = fs.createWriteStream('imglinks2.txt');
        let prods = await getProducts();
        prods = prods.map(prod => prod.Name + " " + prod.Brand);
        //let imgs = [];
        for (const prod of prods) {
            const img = await showlink(prod);
            file.write('"'+img+'",');
            //imgs.push(img);
        }
        
    } catch (err) {
        console.error(err);
    }
}

export default getlinks;
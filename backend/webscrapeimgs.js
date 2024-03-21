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

async function getimgs() {
    try {
        const file = fs.createWriteStream('imglinks2.txt');
        let prods = await getProducts();
        prods = prods.map(prod => prod.Name + " " + prod.Brand);
        //let imgs = [];
        for (const prod of prods.slice(1456)) {
            const img = await showimg(prod);
            file.write('"'+img+'",');
            //imgs.push(img);
        }
        
    } catch (err) {
        console.error(err);
    }
}

export default getimgs;
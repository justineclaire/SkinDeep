import puppeteer from 'puppeteer';

async function showimg(name) {

  const browser = await puppeteer.launch({ headless: true, slowMo: 100 })
  const page = await browser.newPage()

  console.log('-', name)
  const url = `https://duckduckgo.com/?q=${name.replaceAll(
    ' ',
    '+',
  )}&va=b&t=hc&iar=images&iax=images&ia=images`

  //in case we encounter a page without images or an error
  try {
    await page.goto(url)

    //make sure the page is loaded and contain our targeted element
    await page.waitForNavigation()
    await page.waitForSelector('.tile--img__media')

    await page.evaluate(
      () => {
        const firstImage = document.querySelector('.tile--img__media')
        //we open the panel that contains the image info
        firstImage.click()
      },
      { delay: 400 },
    )

    //get the link of the image from the panel
    await page.waitForSelector('.detail__pane a')
    const link = await page.evaluate(
      () => {
        const links = document.querySelectorAll('.detail__media__img-link')
        return links[0].getAttribute('href');
      },
      { delay: 250 },
    )
    browser.close();
    return link;
    //console.log('link succesfully retrieved:', link)
    //console.log('=====')
  } catch (e) {
    console.log(e)
  }

 
/*  // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //console.log(name);
    const searchQuery = name.replaceAll(' ', '%20');
    console.log(name);
    const url = `https://www.bing.com/images/search?q=${searchQuery}`;
    // Go to the Bing images search URL
    
    try {
        await page.goto(url);
        //await page.waitForSelector('img:nth-child(13)');
    } catch (error) {
        console.log(error)
    }

    // Scrape the image URLs
    const imageUrl = await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
      const images = Array.from(document.querySelectorAll('img'));
      let img = images[12];
      //console.log(img);
      return img.src;
    });

  await browser.close();
  console.log(imageUrl);
  //return imageUrl;
  return 'hi';*/
  
}

export default showimg;
import puppeteer from 'puppeteer';

async function showlink(name) {

  const browser = await puppeteer.launch({ headless: true, slowMo: 100 })
  const page = await browser.newPage()

  console.log('-', name)
  const url = `https://duckduckgo.com/?q=${name.replaceAll(
    ' ',
    '+',
  )}&va=b&t=hc&iax=shopping&ia=shopping`

  //in case we encounter a page without images or an error
  try {
    await page.goto(url)

    //make sure the page is loaded and contain our targeted element
    await page.waitForNavigation()
    //get the link of the image from the panel
    await page.waitForSelector('.tile__title--pr a')
    const link = await page.evaluate(
      () => {
        const links = document.querySelectorAll('.tile__title--pr a')
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
  
}

export default showlink;
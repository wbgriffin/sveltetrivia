async function main() {
  try {
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    });

    await doc.loadInfo();
    console.log(doc.title);

    const sheet = await doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    rows.forEach((row) => {
      console.log(row);
    });
  } catch (e) {
    console.log('Error: ', e);
  }
}

main().then(() => {
  console.log('all done');
});

const CONFIG = {
  FOLDER_ID: 'gdrive_folder_id,
  NOTIFICATION_EMAIL: 'recipients_email'
};

function createNextMonthBudget() {
  const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);

  const currentDate = new Date();
  //debugging purposes
  //currentDate.setMonth(currentDate.getMonth() + 1);
  const previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - 1);

  const currentBudgetFileName = getBudgetFileName(currentDate);
  const previousBudgetFileName = getBudgetFileName(previousDate);

  Logger.log(`Current File: ${currentBudgetFileName}`);
  Logger.log(`Template File: ${previousBudgetFileName}`);

  const templateFile = findFileByName(folder, previousBudgetFileName);

  if (!templateFile) {
    throw new Error(
      `Template file not found: ${previousBudgetFileName}`
    );
  }

  const newBudgetFile =
    templateFile.makeCopy(currentBudgetFileName, folder);

  Logger.log(`Created: ${newBudgetFile.getName()}`);

  sendNotificationEmail(newBudgetFile.getName());
}

function getBudgetFileName(date) {
  const timezone = Session.getScriptTimeZone();

  const monthNumber = Utilities.formatDate(date, timezone, 'MM');
  const monthName = Utilities.formatDate(date, timezone, 'MMMM');

  return `${monthNumber} ${monthName.toUpperCase()} Budget Tracking`;
}

function findFileByName(folder, targetFileName) {
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();

    if (file.getName() === targetFileName) {
      return file;
    }
  }

  return null;
}

function sendNotificationEmail(fileName) {
  const subject = 'New Budget File Created';
  const body = `Budget file "${fileName}" has been prepared!`;

  GmailApp.sendEmail(
    CONFIG.NOTIFICATION_EMAIL,
    subject,
    body
  );
}

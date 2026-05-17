📊 Monthly Budget File Automation (Google Apps Script)
Overview

This Google Apps Script automates the creation of a new monthly budget tracking file in Google Drive. It copies the previous month’s budget file, renames it for the current month, saves it in a specified folder, and sends an email notification once the new file is created.

This helps ensure a consistent monthly budgeting workflow with minimal manual effort.

🚀 Features
Automatically finds the previous month’s budget file in a Google Drive folder
Creates a copy of the previous month's file
Renames the new file based on the current month
Stores the new file in the same Drive folder
Sends an email notification after successful creation
Logs key actions for debugging and tracking

🧠 How It Works
1. Date Calculation

The script determines:

Current month and year (for the new file)
Previous month and year (to locate the template file)

These are formatted into a readable structure like:

05 MAY Budget Tracking
04 APRIL Budget Tracking

2. File Search (Template Detection)

The script scans a specific Google Drive folder and looks for the previous month's budget file.

If found, it is used as the template for the new file.

3. File Copy & Creation

Once the previous file is found:

It is duplicated using makeCopy()
The new file is renamed to the current month format
The copy is saved in the same Drive folder

4. Email Notification

After successful creation, the script sends an email notification:

Recipient:

Hardcoded Gmail address (can be customized)

Content:

Confirms that the new budget file has been created

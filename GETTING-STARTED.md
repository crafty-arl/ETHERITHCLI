# Getting Started with Etherith Family Archive

Welcome! This guide will help you install and start using Etherith to preserve your family's precious memories forever.

---

## What You'll Need

Before you begin, make sure you have:
- ✅ A Windows computer
- ✅ An internet connection
- ✅ About 10 minutes of time

**Don't worry if you're not tech-savvy!** We've made this as simple as possible.

---

## Installation - 4 Easy Steps

### Step 1: Download Etherith

You should already have the Etherith files in a folder on your computer.
If you're reading this file, you're in the right place! 🎉

### Step 2: Run the Installer (First Time)

1. **Find the file called `install.bat`** in the Etherith folder
2. **Double-click `install.bat`** to start the installation
3. **Follow the on-screen instructions** - the installer will guide you through everything

![Installation Tip](https://via.placeholder.com/15/00ff00/000000?text=+) **The installer will:**
- Check if you have Node.js (and install it if needed)
- Set up your computer to run Etherith
- Install Etherith so you can use it anywhere

**Time required:** 5-10 minutes (mostly waiting for downloads)

### Step 3: Restart Your Computer (Important!)

**IF the installer installed Node.js:**
1. **Close all windows**
2. **Restart your computer**
3. **Wait for your computer to fully boot up**

**Why restart?** This ensures Node.js is properly recognized by your computer. Windows needs a fresh start to add Node.js to your system.

### Step 4: Run the Installer Again (After Restart)

**IF you restarted your computer:**
1. **Go back to the Etherith folder**
2. **Double-click `install.bat` AGAIN**
3. **This time it will install Etherith** (much faster, 1-2 minutes)

**Why twice?** The first run installs Node.js, the second run installs Etherith. If Node.js was already on your computer, you only need to run it once!

![Installation Tip](https://via.placeholder.com/15/ffff00/000000?text=+) **The installer will tell you** if you need to restart and run it again. Just follow the on-screen messages!

---

## After Installation - Using Etherith

Once your computer has restarted, you're ready to start preserving memories!

### Opening the Command Prompt

To use Etherith, you'll need to open the **Command Prompt**:

1. **Press the Windows key** (between Ctrl and Alt)
2. **Type:** `cmd`
3. **Press Enter**

A black window will open - this is the Command Prompt, where you'll type Etherith commands.

![Command Prompt Tip](https://via.placeholder.com/15/00ff00/000000?text=+) **Don't worry!** This might look intimidating, but we'll show you exactly what to type.

---

## Your First Steps with Etherith

### Test That Everything Works

In the Command Prompt, type:
```
etherith --help
```

Press Enter. You should see a list of Etherith commands. This means it's working! 🎉

### Create Your Family Archive

Let's create a special place to store your family's memories:

```
etherith init "Johnson Family Archive"
```

**Replace "Johnson Family Archive"** with your family name, like:
- "Smith Family Memories"
- "Garcia Family Heritage"
- "My Family Archive"

Press Enter. Etherith will create your archive!

### Add Your First Memory

Now let's add a photo or document. Here's how:

```
etherith add "C:\Users\YourName\Pictures\family-photo.jpg"
```

**Important:** Replace the path with the actual location of your file!

**How to find your file path:**
1. Find your photo or document in File Explorer
2. Click on it once
3. Hold Shift and right-click on the file
4. Choose "Copy as path"
5. Paste it after `etherith add ` in the Command Prompt

Press Enter, and your file will be preserved forever on IPFS!

### Search Your Memories

Later, you can find anything you've saved:

```
etherith search "grandma"
```

This will show all files related to "grandma". You can search for:
- Names: "uncle james", "grandma", "aunt sarah"
- Events: "wedding", "graduation", "reunion"
- Years: "1995", "2020"
- Anything you remember!

---

## Quick Reference Card

Print this out and keep it handy!

### Opening Command Prompt
1. Press Windows key
2. Type: `cmd`
3. Press Enter

### Common Commands

**Get Help:**
```
etherith --help
```

**Create Your Archive:**
```
etherith init "My Family Archive"
```

**Add a File:**
```
etherith add "path\to\your\file.jpg"
```

**Search for Memories:**
```
etherith search "keyword"
```

**See What You've Added:**
```
etherith list
```

---

## Important Things to Know

### ⚠️ Your Files Are Public

When you add files to Etherith, they're stored on IPFS - a public network. This means:
- ✅ Your files will last forever - they can't be deleted
- ✅ You can access them from anywhere
- ⚠️ Anyone with the link can see them
- ❌ Don't upload private information like:
  - Social Security numbers
  - Credit card information
  - Private medical records
  - Passwords or account information

### ✅ What's Safe to Upload

Great things to preserve in your family archive:
- ✅ Family photos and videos
- ✅ Recipes and cooking traditions
- ✅ Family stories and histories
- ✅ Scanned letters and documents
- ✅ Cultural traditions and ceremonies
- ✅ Family tree information

---

## Need Help?

### Something Not Working?

1. **Check FAQ.md** - Common questions and answers
2. **Check TROUBLESHOOTING.md** - Solutions to common problems
3. **Try restarting your computer** - This fixes many issues!

### Common Issues

**"etherith is not recognized"**
- Did you restart your computer after installation?
- Try closing Command Prompt and opening a new one

**"Running scripts is disabled"**
- Run the file called `fix-powershell.bat`
- Or use Command Prompt (cmd) instead of PowerShell

**Still stuck?**
- Check the FAQ.md file for more help
- Make sure you completed all installation steps
- Try running `install.bat` again

---

## Tips for Success

### 📝 Take Notes
Write down the commands you use most often until you remember them.

### 🗂️ Organize Your Files
Before uploading, organize your files on your computer:
- Rename files with clear names: "grandma-birthday-1985.jpg"
- Keep files in organized folders by year or event
- Add descriptions when uploading files

### 💾 Keep Backups
Even though Etherith preserves files forever, keep your original files safe too!

### 👨‍👩‍👧‍👦 Involve Your Family
Share what you're doing with family members. They might have:
- Photos or documents to contribute
- Stories to add to files
- Ideas for organizing the archive

---

## What's Next?

Now that you're set up, you can:

1. **Start adding your most precious memories**
   - Old family photos
   - Important documents
   - Recipes and traditions

2. **Add descriptions to your files**
   ```
   etherith add "photo.jpg" --description "Grandma's 80th birthday party"
   ```

3. **Tag files for easy searching**
   ```
   etherith add "photo.jpg" --tags "birthday,grandma,1995,family"
   ```

4. **Explore all commands**
   ```
   etherith --help
   ```

---

## Welcome to the Etherith Family!

You're now part of a community preserving Black and Brown family legacies for generations to come. Your family's stories, photos, and memories will live forever on the decentralized web.

**Thank you for preserving history!** 🌳

---

## Quick Help

| Problem | Solution |
|---------|----------|
| Can't find install.bat | Look in the Etherith folder you downloaded |
| Installation failed | Try running as Administrator (right-click → Run as administrator) |
| etherith command not found | Restart your computer, then try again |
| Scripts disabled error | Run fix-powershell.bat or use cmd instead of PowerShell |
| Need more help | Check FAQ.md and TROUBLESHOOTING.md |

---

**Remember:** If you get stuck, that's okay! Take a break, check the FAQ, and try again. You've got this! 💪

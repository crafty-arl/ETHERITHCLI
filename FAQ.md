# Etherith Family Archive - Frequently Asked Questions (FAQ)

Common questions and answers for Etherith users.

---

## Installation Questions

### Q: Do I need to restart my computer after installing?

**A: YES! And you need to run install.bat AGAIN after restarting.**

This is **very important** if Node.js was just installed:

**The Complete Process:**
1. Run `install.bat` (first time)
2. If Node.js gets installed, the installer will tell you to restart
3. **Restart your computer** completely
4. **Run `install.bat` AGAIN** (second time - this installs Etherith)
5. Now Etherith is ready to use!

**Why restart?**
- Windows needs a restart to recognize Node.js
- Node.js must be in your system PATH before Etherith can be installed
- Without restarting, Etherith installation will fail

**Why run install.bat twice?**
- First run: Installs Node.js (if needed)
- Restart: Activates Node.js
- Second run: Installs Etherith

**Don't worry!** The second install is much faster (1-2 minutes) and the installer clearly tells you what to do.

### Q: Do I need to run install.bat twice?

**A: Only if Node.js wasn't already on your computer.**

**Scenario 1: Node.js already installed**
- Run `install.bat` once
- Everything installs in one go
- Ready to use after install completes!

**Scenario 2: Node.js NOT installed (most common for new users)**
- Run `install.bat` → Installs Node.js
- Restart computer → Activates Node.js
- Run `install.bat` again → Installs Etherith
- Now ready to use!

**The installer will tell you** which scenario applies and what to do next. Just follow the on-screen instructions!

### Q: How long does installation take?

**A: About 5-10 minutes total (or 10-15 if Node.js needs to be installed).**

**First-time installation (with Node.js):**
- First run of install.bat: 5-8 minutes
- Restart computer: 2-3 minutes
- Second run of install.bat: 1-2 minutes
- **Total: 10-15 minutes**

**If Node.js already installed:**
- Run install.bat: 5-10 minutes
- **Total: 5-10 minutes**

If it's taking much longer, check your internet connection or see TROUBLESHOOTING.md.

### Q: What is Node.js and why do I need it?

**A: Node.js is free software that Etherith needs to run.**

Think of it like this:
- **Etherith** = your car
- **Node.js** = the engine

Without Node.js, Etherith can't work. But don't worry:
- ✅ It's completely free
- ✅ It's safe (from nodejs.org)
- ✅ The installer adds it automatically
- ✅ Millions of people use it worldwide

### Q: Do I need to be an administrator to install?

**A: It helps, but it's not always required.**

**If the regular installation fails:**
1. Right-click on `install.bat`
2. Choose "Run as administrator"
3. Click "Yes" when Windows asks permission

### Q: Can I install on a laptop? On multiple computers?

**A: Yes to both!**

- ✅ **Laptops**: Works perfectly on laptops
- ✅ **Multiple computers**: Install on as many computers as you want
- ✅ **Desktops**: Works on all Windows desktops

Each computer needs its own installation, but your files on IPFS are accessible from anywhere!

### Q: Do I need internet to install?

**A: Yes, for installation. No, for some features after.**

**During installation:**
- ✅ Internet required - Downloads Node.js and Etherith files

**After installation:**
- ✅ Internet required - Uploading files to IPFS
- ✅ Internet required - Searching files
- ❌ Internet not required - Viewing files you've already downloaded

---

## Using Etherith Questions

### Q: Where do I type Etherith commands?

**A: In the Command Prompt (the black window).**

**How to open Command Prompt:**
1. Press the Windows key on your keyboard
2. Type: `cmd`
3. Press Enter
4. A black window opens - that's the Command Prompt!

**Then type Etherith commands** like:
```
etherith --help
etherith init "My Family Archive"
```

### Q: Why use Command Prompt instead of double-clicking?

**A: Etherith is a "command-line" tool.**

It's designed to be used by typing commands, which gives you more control and power. Think of it like:
- **Point-and-click apps** = automatic transmission car (easier, less control)
- **Command-line tools** = manual transmission car (more control, more powerful)

Don't worry - we give you exact commands to type!

### Q: Can I use PowerShell instead of Command Prompt?

**A: Yes, but you might need to run fix-powershell.bat first.**

- **Command Prompt (cmd)** - Works immediately, no setup needed ✅
- **PowerShell** - Needs configuration first, then works fine ✅

If you get a "scripts disabled" error in PowerShell:
1. Find `fix-powershell.bat` in the Etherith folder
2. Double-click it
3. PowerShell will now work!

### Q: What happens to my files when I upload them?

**A: They're stored permanently on IPFS (a global network).**

Here's what happens:
1. You run `etherith add "photo.jpg"`
2. Etherith uploads your photo to IPFS (decentralized storage)
3. You get a permanent link (like a URL)
4. Your photo is now stored on thousands of computers worldwide
5. It can never be deleted or lost!

**Important:**
- ✅ Files last forever
- ✅ Accessible from anywhere
- ⚠️ Files are PUBLIC - anyone with the link can see them
- ❌ Don't upload private/sensitive information

### Q: How much does it cost to use Etherith?

**A: Etherith is completely FREE!**

- ✅ **Free to install**
- ✅ **Free to use**
- ✅ **Free file storage on IPFS**
- ✅ **No hidden fees**
- ✅ **No subscriptions**
- ✅ **No limits on files**

IPFS storage is free because it's a decentralized network maintained by the community.

### Q: Is there a limit to how many files I can upload?

**A: No official limit!**

However:
- ✅ Upload as many files as you want
- ✅ Each file can be quite large (we recommend under 100MB per file)
- ⚠️ Very large files (over 100MB) might take a long time to upload
- 💡 **Tip**: For videos, consider compressing them first

### Q: Can I delete files after uploading?

**A: No - files on IPFS are permanent.**

This is actually a FEATURE, not a bug:
- ✅ Your family memories can never be lost
- ✅ Files survive even if your computer dies
- ✅ Future generations can access them

⚠️ **That's why we warn**: Only upload files you're okay with being public and permanent!

### Q: Can I organize files into folders?

**A: Yes! Using tags and descriptions.**

While Etherith doesn't use traditional folders, you can organize files:

**By Tags:**
```
etherith add "photo1.jpg" --tags "wedding,1995,mom,dad"
etherith add "photo2.jpg" --tags "graduation,2010,sister"
```

**By Description:**
```
etherith add "photo.jpg" --description "Grandma's 80th birthday party"
```

**Then search by tag or keyword:**
```
etherith search "wedding"
etherith search "grandma"
```

---

## Troubleshooting Questions

### Q: I get "etherith is not recognized as a command" - what's wrong?

**A: This usually means one of four things:**

**1. Node.js was just installed and you didn't run install.bat a SECOND time**
- **Solution**: Run `install.bat` again to complete the Etherith installation

**2. You didn't restart your computer after Node.js was installed**
- **Solution**: Restart your computer completely, then run `install.bat` again

**3. You opened Command Prompt BEFORE installation finished**
- **Solution**: Close Command Prompt and open a NEW one

**4. Installation didn't complete successfully**
- **Solution**: Run `install.bat` again and watch for error messages

### Q: I see "running scripts is disabled on this system" - help!

**A: This is a PowerShell security setting. Easy fix!**

**Option 1 (Easiest):**
1. Find `fix-powershell.bat` in the Etherith folder
2. Double-click it
3. Press any key when prompted
4. Done! Try Etherith again

**Option 2 (Alternative):**
- Use Command Prompt (cmd) instead of PowerShell
- Command Prompt doesn't have this restriction

### Q: Installation failed - what should I do?

**A: Try these steps in order:**

**Step 1: Run as Administrator**
1. Right-click `install.bat`
2. Choose "Run as administrator"
3. Click "Yes" when prompted

**Step 2: Clear Cache and Retry**
1. Press Windows key + R
2. Type: `cmd`
3. Press Enter
4. Type: `npm cache clean --force`
5. Run `install.bat` again

**Step 3: Check Internet Connection**
- Make sure you're connected to the internet
- Try opening a website to verify

**Step 4: Check TROUBLESHOOTING.md**
- Detailed solutions for specific error messages

### Q: My antivirus is blocking the installation - is this safe?

**A: Yes, Etherith is completely safe!**

Sometimes antivirus software flags new programs. Here's what to do:

1. **Etherith is safe** - It's open source, you can inspect all the code
2. **Node.js is safe** - From nodejs.org, trusted by millions
3. **Add an exception** - Tell your antivirus to allow Etherith

**To add an exception:**
- Find the Etherith folder
- Add it to your antivirus's "safe" or "exception" list
- Run `install.bat` again

### Q: Can I uninstall Etherith if I don't want it anymore?

**A: Yes! Super easy.**

**Windows:**
1. Find `uninstall.bat` in the Etherith folder
2. Double-click it
3. Follow the prompts

**Or manually:**
1. Press Windows + R
2. Type: `cmd`
3. Press Enter
4. Type: `npm run uninstall-cli`

**To also remove Node.js (optional):**
1. Go to Settings → Apps
2. Find "Node.js"
3. Click Uninstall

---

## File and Storage Questions

### Q: What file types can I upload?

**A: Almost anything!**

Commonly uploaded:
- ✅ **Photos**: .jpg, .jpeg, .png, .gif, .heic
- ✅ **Videos**: .mp4, .mov, .avi (compress large files first)
- ✅ **Documents**: .pdf, .doc, .docx, .txt
- ✅ **Scans**: .pdf, .tiff, .jpg
- ✅ **Audio**: .mp3, .wav, .m4a

**Basically**: If it's a file on your computer, you can upload it!

### Q: How long does it take to upload a file?

**A: Depends on file size and internet speed.**

**Typical upload times:**
- Photo (2-5 MB): 10-30 seconds
- Document (1 MB): 5-10 seconds
- Video (50 MB): 2-5 minutes
- Large archive (100 MB): 5-10 minutes

💡 **Tip**: Start with smaller files to test, then upload larger ones.

### Q: Can I upload folders/multiple files at once?

**A: Currently one file at a time.**

**To upload multiple files:**
```
etherith add "photo1.jpg"
etherith add "photo2.jpg"
etherith add "photo3.jpg"
```

💡 **Tip**: Create a .zip file with multiple files, then upload the .zip!

```
# Right-click files → Send to → Compressed (zipped) folder
# Then upload:
etherith add "family-photos.zip"
```

### Q: Can family members access my uploaded files?

**A: Yes! Share the IPFS link with them.**

When you upload a file, Etherith gives you a link like:
```
https://ipfs.io/ipfs/Qm...
```

**To share with family:**
1. Copy the link
2. Send it via email, text, or messaging app
3. They can click it to view/download the file
4. They don't need Etherith to VIEW files - only to UPLOAD

---

## Privacy and Security Questions

### Q: Is my information private?

**A: No - files on IPFS are PUBLIC.**

**What this means:**
- ✅ Anyone with the IPFS link can access your files
- ❌ Files are NOT password protected
- ❌ Files are NOT encrypted by default
- ⚠️ Don't upload sensitive information

**What's safe to upload:**
- ✅ Family photos
- ✅ Recipes and stories
- ✅ Public family history
- ✅ Cultural traditions

**What NOT to upload:**
- ❌ Social Security numbers
- ❌ Credit card info
- ❌ Passwords
- ❌ Private medical records
- ❌ Bank statements

### Q: Who can see my files?

**A: Anyone who has the IPFS link.**

Think of it like:
- **IPFS links** = Unlisted YouTube videos
- Not shown in search engines (usually)
- But anyone with the link can access them
- Share links only with people you trust

### Q: Will my files show up on Google?

**A: Usually no, but they could.**

IPFS files typically don't appear in Google searches, but:
- The links are technically public
- Don't rely on obscurity for privacy
- Only upload files you're comfortable sharing publicly

---

## Technical Questions (For Curious Users)

### Q: What is IPFS?

**A: InterPlanetary File System - a decentralized storage network.**

**Simple explanation:**
- Traditional storage: Files on one company's servers (Google, Dropbox, etc.)
- IPFS: Files distributed across thousands of computers worldwide
- No single point of failure
- Content can't be censored or taken down
- Free and open source

### Q: Where are my files actually stored?

**A: On IPFS nodes around the world.**

When you upload:
1. File is broken into chunks
2. Chunks are distributed to multiple IPFS nodes (computers running IPFS)
3. Each chunk is stored on multiple nodes for redundancy
4. Anyone with the link can request and download from these nodes

Your files are pinned (kept available) by Pinata, an IPFS pinning service.

### Q: What happens if Etherith stops working?

**A: Your files are still safe on IPFS!**

Because files are on IPFS (not controlled by Etherith):
- ✅ Files remain accessible even if Etherith disappears
- ✅ You can access files directly via IPFS gateways
- ✅ Other IPFS tools can access your files
- ✅ Your IPFS links work forever

### Q: Can I use Etherith offline?

**A: Only partially.**

**Offline (no internet):**
- ❌ Can't upload new files
- ❌ Can't search your archive
- ✅ Can use some local commands

**Online (with internet):**
- ✅ Full functionality

### Q: Is Etherith open source?

**A: Yes! You can view all the code.**

- Check it out on GitHub
- See exactly what it does
- Contribute improvements
- Trust through transparency

---

## Getting Help

### Q: Something's not working - where can I get help?

**Follow this order:**

1. **Check this FAQ** - You're already here! ✅
2. **Check TROUBLESHOOTING.md** - Detailed problem-solving
3. **Check GETTING-STARTED.md** - Step-by-step beginner guide
4. **Try restarting** - Computer restart fixes many issues
5. **Reinstall** - Run `install.bat` again
6. **Ask for help** - GitHub issues or community support

### Q: The documentation is confusing - can you simplify?

**A: Yes! We're always improving.**

If something is unclear:
- Start with GETTING-STARTED.md (simplest)
- Use this FAQ for specific questions
- TROUBLESHOOTING.md for fixing problems
- README.md for overview

**Still confused?** That's okay! Ask for help.

### Q: Can I suggest new features?

**A: Absolutely!**

We'd love to hear your ideas:
- What features would help you?
- What's confusing or hard to use?
- What would make Etherith better for families?

Share feedback through GitHub issues or community channels.

---

## Quick Answer Reference

| Question | Quick Answer |
|----------|--------------|
| Do I need to restart after installing? | **YES!** Then run install.bat AGAIN |
| Do I run install.bat twice? | **YES** - If Node.js was just installed |
| Is it free? | **YES!** Completely free, no limits |
| Are files private? | **NO** - Files are public on IPFS |
| Can I delete uploaded files? | **NO** - Files are permanent |
| Do I need internet? | **YES** - For uploading and searching |
| How long to install? | 5-10 minutes (10-15 with Node.js) |
| Which to use: CMD or PowerShell? | **CMD is easier** - no setup needed |
| Can family access files? | **YES** - Share the IPFS link |
| Is it safe for my computer? | **YES** - Completely safe |

---

**Still have questions?** Check TROUBLESHOOTING.md or ask for help!

**Ready to get started?** See GETTING-STARTED.md for step-by-step instructions!

# Luxe Wedding Invitation — Vercel Starter

A responsive, modern luxury wedding invitation website built with React + Vite.

## Run it on your computer

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP.
3. Open the extracted `luxe-wedding-invite` folder in VS Code.
4. Open Terminal in that folder and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Personalise the invite

Open `src/main.jsx` and edit the `wedding` object near the top:

- `bride`, `groom`
- `date` (ISO date/time, including timezone)
- `dateLabel`
- `venue`, `address`, `mapsUrl`
- `rsvpNumber` (country code + number, digits only; for India use 91 + phone number)

Also edit the sample event names, dates and times in the event cards further down the same file.

### Replace photos

In `src/style.css`, search for `images.unsplash.com` and replace those image URLs with images you have permission to use. For client work, use the couple's approved photos or licensed images.

### Music note

The sound toggle in this starter is a visual demo; it does not play audio yet. Add a licensed audio file and a user-initiated audio player if you want background music. Browsers generally block autoplay until the visitor interacts with the page.

## Deploy to Vercel

### Easiest path: GitHub → Vercel

1. Create/sign in to GitHub and create a new repository.
2. Upload the extracted project files to that repository (upload the files inside the folder, not the ZIP itself).
3. Sign in at https://vercel.com/ and choose **Add New → Project**.
4. Import the GitHub repository.
5. Vercel should detect Vite. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
6. Click **Deploy**. Vercel will give you a live `*.vercel.app` link.

## Before sending to a real couple

- Replace all sample names, dates, event details, venue and RSVP phone number.
- Test every link on a phone.
- Confirm the couple has approved all photos and text.
- Keep a separate project/repository for each couple, or create a proper data-driven template before automating many invitations.

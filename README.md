# Goethe B1 Flashcards

A plain HTML, CSS, and JavaScript flashcard app for Goethe B1 German vocabulary. It runs entirely in the browser, stores progress in `localStorage`, and loads vocabulary from a CSV file.

## Files

- `index.html` - app structure
- `style.css` - responsive iPad, iPhone, and desktop layout
- `script.js` - CSV loading, study modes, filters, and progress tracking
- `vocabulary.csv` - personal Goethe B1 headword deck

## Password Curtain

The app includes a simple password screen for casual privacy. The default password is:

```text
b1
```

To change it, edit this line in `script.js`:

```js
const APP_PASSWORD = "b1";
```

This is not real server-side security. On public hosting, a technical person could still inspect or download site files. It is meant only as a privacy curtain.

Use the `Lock` button in the app header to forget the saved unlock on the current device.

## Progress Ratings

After revealing an answer, choose one rating:

- `Know`
- `Meaning Only` for nouns where you know the meaning but missed or forgot the article
- `Unsure`
- `Don't Know`

The `Meaning known, article unknown` filter shows those article-gap cards again.

## Article Quiz

The `Article Quiz` mode is separate from the normal flashcards. It shows only nouns, asks you to choose `der`, `die`, or `das`, then saves an article-specific rating:

- `I know this`
- `I kind of know this`
- `I don’t know this`

Use the Article Quiz filter to review all noun articles, known articles, kind of known articles, unknown articles, or unrated articles.

## Vocabulary CSV

The app loads `vocabulary.csv` by default. This copy contains a personal-use Goethe B1 headword deck extracted from the Goethe-Zertifikat B1 word list PDF. Most cards use original example sentences extracted from the PDF; cards whose examples could not be matched cleanly use a simple fallback sentence. Many cards still use `add English meaning` as a placeholder, so you can improve meanings over time while keeping the German headwords, articles, and examples in place.

Required columns:

```csv
word,article,english,example
Beruf,der,profession,"Mein Beruf macht mir viel Freude."
```

For verbs, adjectives, and other words without an article, leave the `article` field empty.

## Running Locally

Because browsers may block CSV loading from a directly opened file, run the folder with a small local web server.

From this folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Publishing on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and `vocabulary.csv` to the repository root.
3. In GitHub, open **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root`.
7. Save. GitHub will show the public Pages URL after deployment.

## Add to iPhone or iPad Home Screen

1. Open the app URL in Safari.
2. Tap the Share button.
3. Tap **Add to Home Screen**.
4. Confirm the name and tap **Add**.

Progress is saved on that device in the browser. If you clear Safari website data, progress will be reset.

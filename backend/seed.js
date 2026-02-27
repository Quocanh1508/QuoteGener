const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'quotes.db');
const db = new Database(dbPath);

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "Get busy living or get busy dying.", author: "Stephen King", category: "life" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison", category: "motivation" },
    { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", category: "wisdom" },
    { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", category: "motivation" },
    { text: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith", category: "wealth" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
    { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca", category: "life" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt", category: "life" },
    { text: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.", author: "Henry Ford", category: "success" },
    { text: "In order to write about life first you must live it.", author: "Ernest Hemingway", category: "life" },
    { text: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra", category: "courage" },
    { text: "Sing like no one's listening, love like you've never been hurt, dance like nobody's watching, and live like it's heaven on earth.", author: "Unknown", category: "love" },
    { text: "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", author: "Leo Burnett", category: "creativity" },
    { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard", category: "wisdom" },
    { text: "The unexamined life is not worth living.", author: "Socrates", category: "wisdom" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom" },
    { text: "The way I see it, if you want the rainbow, you gotta put up with the rain.", author: "Dolly Parton", category: "life" },
    { text: "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.", author: "Hillary Clinton", category: "kindness" },
    { text: "Don't settle for what life gives you; make life better and build something.", author: "Ashton Kutcher", category: "motivation" },
    { text: "Everybody wants to be famous, but nobody wants to do the work.", author: "Kevin Hart", category: "work" },
    { text: "Everything negative – pressure, challenges – is all an opportunity for me to rise.", author: "Kobe Bryant", category: "motivation" },
    { text: "I like criticism. It makes you strong.", author: "LeBron James", category: "strength" },
    { text: "You never really learn much from hearing yourself speak.", author: "George Clooney", category: "learning" },
    { text: "Life hits you in the head with a brick. Don't lose faith.", author: "Steve Jobs", category: "faith" },
    { text: "Take your victories, whatever they may be, cherish them, use them, but don't settle for them.", author: "Mia Hamm", category: "success" },
    { text: "Live for each second without hesitation.", author: "Elton John", category: "life" },
    { text: "Life is short, and it is up to you to make it sweet.", author: "Sarah Louise Delany", category: "life" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi", category: "inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston S. Churchill", category: "courage" },
    { text: "Never bend your head. Always hold it high. Look the world straight in the eye.", author: "Helen Keller", category: "courage" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", category: "success" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "belief" },
    { text: "When you have a dream, you've got to grab it and never let go.", author: "Carol Burnett", category: "dreams" },
    { text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", author: "Jimmy Dean", category: "resilience" },
    { text: "No matter what you're going through, there's a light at the end of the tunnel.", author: "Demi Lovato", category: "hope" },
    { text: "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.", author: "William James", category: "attitude" },
    { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein", category: "life" },
    { text: "Nothing is impossible. The word itself says 'I'm possible!'", author: "Audrey Hepburn", category: "inspiration" },
    { text: "Limit your 'always' and your 'nevers'.", author: "Amy Poehler", category: "wisdom" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "dreams" },
    { text: "Try to be a rainbow in someone else's cloud.", author: "Maya Angelou", category: "kindness" },
    { text: "You do not find the happy life. You make it.", author: "Camilla Eyring Kimball", category: "happiness" },
    { text: "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.", author: "Deep Roy", category: "positivity" },
    { text: "Sometimes you will never know the value of a moment, until it becomes a memory.", author: "Dr. Seuss", category: "memory" },
    { text: "The most wasted of days is one without laughter.", author: "E.E. Cummings", category: "happiness" },
    { text: "You must do the things you think you cannot do.", author: "Eleanor Roosevelt", category: "courage" },
    { text: "It's not where you came from. It's where you're going that counts.", author: "Ella Fitzgerald", category: "future" },
    { text: "It is never too late to be what you might have been.", author: "George Eliot", category: "potential" },
    { text: "Stay close to anything that makes you glad you are alive.", author: "Hafez", category: "happiness" },
    { text: "Make each day your masterpiece.", author: "John Wooden", category: "life" },
    { text: "Happiness often sneaks in through a door you didn't know you left open.", author: "John Barrymore", category: "happiness" },
    { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn", category: "happiness" },
    { text: "Life changes very quickly, in a very positive way, if you let it.", author: "Lindsey Vonn", category: "change" },
    { text: "Keep your face to the sunshine and you cannot see a shadow.", author: "Helen Keller", category: "positivity" },
    { text: "To live will be an awfully big adventure.", author: "J.M. Barrie", category: "adventure" },
    { text: "Life is a journey, not a destination.", author: "Ralph Waldo Emerson", category: "life" },
    { text: "We generate fears while we sit. We overcome them by action.", author: "Dr. Henry Link", category: "action" },
    { text: "Think like a queen. A queen is not afraid to fail.", author: "Oprah Winfrey", category: "courage" },
    { text: "A lonely day is God's way of saying that he wants to spend some quality time with you.", author: "Criss Jami", category: "spirituality" },
    { text: "Keep a little fire burning; however small, however hidden.", author: "Cormac McCarthy", category: "hope" },
    { text: "I have noticed that even people who claim everything is predestined, and that we can do nothing to change it, look before they cross the road.", author: "Stephen Hawking", category: "humor" },
    { text: "A day without sunshine is like, you know, night.", author: "Steve Martin", category: "humor" },
    { text: "Do not take life too seriously. You will never get out of it alive.", author: "Elbert Hubbard", category: "humor" },
    { text: "There are no traffic jams along the extra mile.", author: "Roger Staubach", category: "motivation" },
    { text: "It is never too late to be what you might have been.", author: "George Eliot", category: "inspiration" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "action" },
    { text: "Out of the mountain of despair, a stone of hope.", author: "Martin Luther King Jr.", category: "hope" },
    { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead", category: "humor" },
    { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson", category: "wisdom" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "dreams" },
    { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin", category: "learning" },
    { text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller", category: "love" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "hope" },
    { text: "Whoever is happy will make others happy too.", author: "Anne Frank", category: "happiness" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "perseverance" },
    { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey", category: "gratitude" },
    { text: "Remember that not getting what you want is sometimes a wonderful stroke of luck.", author: "Dalai Lama", category: "luck" },
    { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou", category: "creativity" },
    { text: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks", category: "courage" },
    { text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh", category: "passion" },
    { text: "A truly rich man is one whose children run into his arms when his hands are empty.", author: "Unknown", category: "family" },
    { text: "If you want your children to turn out well, spend twice as much time with them, and half as much money.", author: "Abigail Van Buren", category: "family" },
    { text: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray", category: "dreams" },
    { text: "The battles that count aren't the ones for gold medals. The struggles within yourself—the invisible battles inside all of us—that's where it's at.", author: "Jesse Owens", category: "struggle" },
    { text: "Education costs money. But then so does ignorance.", author: "Sir Claus Moser", category: "education" },
    { text: "I didn't fail the test. I just found 100 ways to do it wrong.", author: "Benjamin Franklin", category: "humor" },
    { text: "Have no fear of perfection, you'll never reach it.", author: "Salvador Dali", category: "perfection" },
    { text: "Everything has beauty, but not everyone can see.", author: "Confucius", category: "beauty" },
    { text: "How wonderful it is that nobody need wait a single moment before starting to improve the world.", author: "Anne Frank", category: "action" },
    { text: "When I let go of what I am, I become what I might be.", author: "Lao Tzu", category: "potential" },
    { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou", category: "life" },
    { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", category: "mistakes" },
    { text: "We know what we are, but know not what we may be.", author: "William Shakespeare", category: "potential" },
    { text: "It's not what you look at that matters, it's what you see.", author: "Henry David Thoreau", category: "perception" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "happiness" },
    { text: "That which does not kill us makes us stronger.", author: "Friedrich Nietzsche", category: "strength" },
    { text: "Love yourself first and everything else falls into line.", author: "Lucille Ball", category: "love" },
    { text: "Lead from the heart, not the head.", author: "Princess Diana", category: "leadership" }
];

console.log('Initializing database...');

db.pragma('journal_mode = WAL');

// Drop table if it exists to start fresh on seed
db.exec('DROP TABLE IF EXISTS quotes');

// Create table
db.exec(`
  CREATE TABLE quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL
  )
`);

console.log('Table created. Inserting quotes...');

// Insert quotes safely within a transaction
const insert = db.prepare('INSERT INTO quotes (text, author, category) VALUES (?, ?, ?)');

const insertMany = db.transaction((quotesList) => {
    for (const quote of quotesList) {
        insert.run(quote.text, quote.author, quote.category);
    }
});

insertMany(quotes);

console.log(`Successfully seeded ${quotes.length} quotes!`);

db.close();

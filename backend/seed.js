const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const quotes = [
    // English
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "Get busy living or get busy dying.", author: "Stephen King", category: "life" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison", category: "motivation" },
    { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", category: "wisdom" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston S. Churchill", category: "courage" },

    // Vietnamese
    { text: "Không có gì quý hơn độc lập tự do.", author: "Hồ Chí Minh", category: "freedom" },
    { text: "Trăm hay không bằng tay quen.", author: "Tục ngữ Việt Nam", category: "wisdom" },
    { text: "Thất bại là mẹ thành công.", author: "Tục ngữ Việt Nam", category: "success" },
    { text: "Đi một ngày đàng, học một sàng khôn.", author: "Tục ngữ Việt Nam", category: "learning" },
    { text: "Có chí thì nên.", author: "Tục ngữ Việt Nam", category: "motivation" },
    { text: "Nước chảy đá mòn.", author: "Tục ngữ Việt Nam", category: "perseverance" },
    { text: "Không có con đường nào dài quá nếu bạn đi từng bước một.", author: "Khuyết danh", category: "life" },
    { text: "Cuộc sống không phải là để tìm kiếm chính mình, cuộc sống là để tạo ra chính mình.", author: "George Bernard Shaw", category: "life" },

    // Chinese
    { text: "千里之行，始於足下 (A journey of a thousand miles begins with a single step).", author: "老子 (Lao Tzu)", category: "wisdom" },
    { text: "知己知彼，百戰不殆 (If you know the enemy and know yourself, you need not fear the result of a hundred battles).", author: "孫子 (Sun Tzu)", category: "wisdom" },
    { text: "三人行，必有我師焉 (When I walk along with two others, they may serve as my teachers).", author: "孔子 (Confucius)", category: "learning" },
    { text: "温故而知新，可以为师矣 (If a man keeps cherishing his old knowledge, so as continually to be acquiring new, he may be a teacher of others).", author: "孔子 (Confucius)", category: "learning" },
    { text: "学而不思则罔，思而不学则殆 (Learning without thought is labor lost; thought without learning is perilous).", author: "孔子 (Confucius)", category: "learning" },

    // Japanese
    { text: "七転び八起き (Fall down seven times, stand up eight).", author: "Japanese Proverb", category: "resilience" },
    { text: "猿も木から落ちる (Even monkeys fall from trees / Everyone makes mistakes).", author: "Japanese Proverb", category: "wisdom" },
    { text: "千里の道も一歩から (A journey of a thousand miles begins with a single step).", author: "Japanese Proverb", category: "wisdom" },
    { text: "花鳥風月 (Beautiul themes of nature: flower, bird, wind, moon).", author: "Japanese Proverb", category: "nature" },
    { text: "継続は力なり (Continuance is power / Perseverance is strength).", author: "Japanese Proverb", category: "perseverance" }
];

const seedDB = async () => {
    if (!process.env.DATABASE_URL) {
        console.error("ERROR: DATABASE_URL environment variable is missing!");
        process.exit(1);
    }

    console.log('Connecting to PostgreSQL database...');

    try {
        // Drop table if it exists to start fresh on seed
        await pool.query('DROP TABLE IF EXISTS quotes');

        // Create table
        await pool.query(`
      CREATE TABLE quotes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL
      )
    `);

        console.log('Table created. Inserting quotes...');

        // Insert quotes
        for (const quote of quotes) {
            await pool.query(
                'INSERT INTO quotes (text, author, category) VALUES ($1, $2, $3)',
                [quote.text, quote.author, quote.category]
            );
        }

        console.log(`Successfully seeded ${quotes.length} multilingual quotes!`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        pool.end();
    }
};

seedDB();

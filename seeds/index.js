const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async()=>{
    await Campground.deleteMany({})

    // const c = new Campground({title: 'purple field'})
    // await c.save()
    
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '6235cc4668094cb17395228b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type:"Point",
                // coordinates:[78.9629, 20.5937]
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude, 
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dzyrxmr53/image/upload/v1648619953/YelpCamp/aammyhwk9ebzyhinxmsf.jpg',
                  filename: 'YelpCamp/aammyhwk9ebzyhinxmsf',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});
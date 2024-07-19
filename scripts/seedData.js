const mongoose = require('mongoose');
var crypto = require('crypto');
const db = require('../models/index');
const User = require('../models/User');

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1/cohort24"
)


function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
      const iterations = 50000;
      const keylen = 32;
      const digest = 'sha256';
      
      crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
          if (err) {
              reject(err);
          } else {
              resolve(key.toString('hex'));
          }
      })
  });
}

const USERS = [
    {
        firstName: "Tarun",
        lastName: "Anumol",
        password: "password",
        email: "tanumol@umd.edu", 
    },
    {
        firstName: "Curtis",
        lastName: "Bass",
        password: "password",
        email: "cbass25@umd.edu", 
    },
    {
        firstName: "Alyson",
        lastName: "Beasley",
        password: "password",
        email: "abeasle1@umd.edu", 
    },
    { 
        firstName: "Nathan",
        lastName: "Blake",
        password: "password",
        email: "nrblake@umd.edu",
        role: "admin"
    },
    {
        firstName: "Scott",
        lastName: "Calabria",
        password: "password",
        email: "scmsi@umd.edu", 
    },
    {
        firstName: "Krithika",
        preferredName: "Krithy",
        lastName: "Chandrasekaran",
        password: "password",
        email: "ksekaran@umd.edu", 
    },
    {
        firstName: "Fenghao",
        preferredName: "Frank",
        lastName: "Chen",
        password: "password",
        email: "fchen126@umd.edu", 
    },
    {
        firstName: "Zachary",
        preferredName: "Zach",
        lastName: "Coles",
        password: "password",
        email: "zacoles@umd.edu", 
    },
    {
        firstName: "Alecia",
        lastName: "Cooke",
        password: "password",
        email: "acooke70@umd.edu", 
    },
    {
        firstName: "Michael",
        lastName: "Day",
        password: "password",
        email: "mday826@umd.edu", 
    },
    {
        firstName: "Ryan",
        lastName: "Dodge",
        password: "password",
        email: "dodgers@umd.edu", 
    },
    {
        firstName: "Matthew",
        preferredName: "Matt",
        lastName: "Dumont",
        password: "password",
        email: "mdumont@umd.edu", 
        imageUrl: "https://lh3.googleusercontent.com/a-/ALV-UjVSmVHCV5WPxgvXZiRitrTEapegOJlgI8gdXB3XugTXC_P0s-eWsBEa2lohbPpHMTCBCPVRkgQLggDakWVoJ6kyPc5ZF-hob9aT5AY1uQH6YTwg63Khsv3P8chiaAzCb4PTepz77R5ogaqAky32tw0oO2Z_wA0OwTTOiGm16gNGBFso1_ZTq55uEzXc1OkRr0tkftybyYx0HQLgkOLlYtR1hHQB3-cvm4nvKqvbQNT96JJQDpgq2DGeBsl96VBOaBTDNEmvWHZj1gbtXYbTa6-4TrY3hV2UrZEzT_ZbXm1rjI7ARzcG9ieCoLxius2csBTAfPRoSKQpH4RbC8-7Ys-GAPTG_rqhWqalsohdcjObroDzXp66CGnEwWAW3BjRdK_y0wOmDIUDB46zkxKxoFfz_vEd_zlkQGaEBBPPU49y6Cpo78PvcOpLHVdZyx2KK7_Z4WzTl1zWR_zKlD6VJeLR7mp2Nk9faxmBF3zTl_xyM9CUmpqLqeaRO24mFJW0h8ksRf2jQtM21DHnYIwBSuuzkmqkTItuF6qUQ-YsA9D3FvTdGeE1lXq3vyC5NcxkfiX-rkEZdv7hrD-n72aRa3O8yo4pliqg820ifHuQ59YOG38Q2tO3pR1ikkTit_bTII_NQvBH2SzGiGUsAKGmQT1z9tSnO1iKUJPxccHfnyAVmw3sd6xmncZVjZDYRwsWOVVLoASnrZY0TGtSA6CpfxeP7TD88e384VoJ2IskAv0WQ8G65PogxHMsyCaeZUGbCFJkKAPNpAf_STxk52gqVEAxfPbJmXcCFSxhxT9391BwNGiUzv-6q0BV-WEJk7GvAMch5zlDo_ii6kQD1tR1CCY-SRLpjdgxP22AgSQLKIA1vGlRH6hJn75LXm6ISXnywZxV1MyfmdoI-0ZW6kuvJhCR-bzMxq1mCppCQhuxgaz2s-F-_cWdtd0d2NTlc_qIZWNguj07M1CGAmcrOu-mJw=s272-p-k-no"
    },
    {
        firstName: "David",
        lastName: "Earhart",
        password: "password",
        email: "dearhart@umd.edu", 
    },
    {
        firstName: "Derrik",
        lastName: "Everett",
        password: "password",
        email: "daeveret@umd.edu", 
    },
    {
        firstName: "Brannon",
        lastName: "Floyd",
        password: "password",
        email: "bfloyd23@umd.edu", 
    },
    {
        firstName: "Krystal",
        lastName: "Goode",
        password: "password",
        email: "kgoode@umd.edu", 
    },
    {
        firstName: "Toby",
        lastName: "Hawes",
        password: "password",
        email: "thawes1@umd.edu", 
    },
    {
        firstName: "Daniel",
        lastName: "Jemibewon",
        password: "password",
        email: "djemib@umd.edu", 
    },
    {
        firstName: "Matthew",
        lastName: "Krumrine",
        password: "password",
        email: "mkrum@umd.edu", 
    },
    {
        firstName: "Yenal",
        lastName: "Kucuker",
        password: "password",
        email: "ykucuker@umd.edu", 
    },
    {
        firstName: "Jill",
        lastName: "Mackin",
        password: "password",
        email: "jmackin@umd.edu", 
    },
    {
        firstName: "Rajanikanth",
        lastName: "Madabushi",
        preferredName: "Raj",
        password: "password",
        email: "rmadabus@umd.edu", 
    },
    {
        firstName: "Robert",
        lastName: "Moore",
        password: "password",
        email: "rmoore04@umd.edu", 
    }, 
    {
        firstName: "Cipriana",
        lastName: "Patterson",
        password: "password",
        email: "cdpatt@umd.edu", 
    },
    {
        firstName: "Adarsh",
        preferredName: "Ace",
        lastName: "Reddy",
        password: "password",
        email: "aceterp@umd.edu", 
    },
    {
        firstName: "Emmett",
        lastName: "Roberts",
        password: "password",
        email: "erober13@umd.edu", 
    },
    {
        firstName: "Gail",
        lastName: "Schnell",
        password: "password",
        email: "gschnell@umd.edu", 
    },
    {
        firstName: "Jontavius",
        preferredName: "JS",
        lastName: "Singleton",
        password: "password",
        email: "jonsing1@umd.edu",
    },
    {
        firstName: "Cicely",
        lastName: "Walker",
        password: "password",
        email: "cjwalker@umd.edu", 
    },
    {
        firstName: "Michael",
        lastName: "Winton",
        password: "password",
        email: "mwinton@umd.edu", 
    }
]

const seedUsers = async function(users){
    // let hashedPassword = await hashPassword('joe1234')
    // let user = { 
    //   username: "joe",
    //   firstName: "Joe",
    //   lastName: "Schmoe",
    //   salt: salt,
    //   hashedPassword: hashedPassword,
    //   email: "joe@joe.com"
    // }
    
    return User
      .deleteMany({})
      .then(() => {
        return User.collection.insertMany(users)
          .then(data => {
            if(data && data.insertedCount){
              console.log(data.insertedCount + " user records inserted.")
            } else {
              console.log(data)
            }
          })
          .catch(error => {
            console.error(error);
            process.exit(1);
          })
        })
      .catch(error => {
        console.error(error);
        process.exit(1);
      });
}

const seedDB = async function(){
    console.log("Hello from seeding script.");  
    let hashedpassUsers = await USERS.flatMap(async (user) => {
        console.log(`Hashing: ${user.firstName} - ${user.email}`);
        const salt = crypto.randomBytes(16).toString('hex');
        let hashedPassword = await hashPassword(user.password, salt);
        let hashedUser = {
            salt: salt,
            hashedPassword: hashedPassword,
            ...user
        } 
        //console.log(hashedUser);
        return hashedUser;
    })
    //console.log(hashedpassUsers);
    await Promise.all(hashedpassUsers).then(async (users) => {
        console.log(`Users hashed: ${users.length}`)
        //console.log(users);
        await seedUsers(users);
    })
    //await seedUsers(hashedpassUsers);
}

seedDB().then(() => {
    console.log("Database seeing complete.")
    process.exit(0);
}).catch(error => {
    console.error(error);
    process.exit(1);
});
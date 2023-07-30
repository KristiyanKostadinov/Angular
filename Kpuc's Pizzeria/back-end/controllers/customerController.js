const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const Admin = require("../models/admin");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const details = require("../credentials.json");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");
const secretKey = "Kpuc's-pizzeria";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: details.email,
        pass: details.password
    },
});

// => localhost:3000/customers GET REQUEST
router.get("/", (req, res) => {
    Customer.find()
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            console.log("Error in Retrieving Customers: " + err);
            res.status(500).send("Internal Server Error");
        });
});

// => localhost:3000/customers POST REQUEST
// router.post("/", (req, res) => {
//     const customer = new Customer({
//         username: req.body.username,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password,
//         role: req.body.role
//     });
//     customer
//         .save()
//         .then((doc) => {
//             res.json(doc);
//         })
//         .catch((err) => {
//             console.log("Error in Customer Save: " + err);
//             res.status(500).send("Internal Server Error");
//         });
// });

router.post("/", (req, res) => {
    const { username, name, gender, email, phone, password, role } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password: " + err);
            res.status(500).send("Internal Server Error");
        } else {
            const customer = new Customer({
                username,
                name,
                gender,
                email,
                phone,
                password: hashedPassword, // Store the hashed password
                role,
            });

            customer
                .save()
                .then((doc) => {
                    res.json(doc);
                })
                .catch((err) => {
                    console.log("Error in Customer Save: " + err);
                    res.status(500).send("Internal Server Error");
                });
        }
    });
});

router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record with given id: " + req.params.id);
    }
    Customer.findById(req.params.id)
        .then((doc) => {
            if (doc) {
                res.json(doc);
            } else {
                res.status(404).send("Customer not found");
            }
        })
        .catch((err) => {
            console.log("Error in Retrieving Customer: " + err);
            res.status(500).send("Internal Server Error");
        });
});

// router.put('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send("No record with given id:" + req.params.id);

//     const customer = {
//         username: req.body.username,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password,
//         role: req.body.role
//     };

//     Customer.findByIdAndUpdate(req.params.id, customer, { new: true })
//         .then((doc) => {
//             if (doc) {
//                 res.json(doc);
//             } else {
//                 res.status(404).send("Customer not found");
//             }
//         })
//         .catch((err) => {
//             console.log("Error in Customer Update: " + err);
//             res.status(500).send("Internal Server Error");
//         });
// });

router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("No record with given id:" + req.params.id);

    const { username, name, gender, email, phone, password, role } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password: " + err);
            res.status(500).send("Internal Server Error");
        } else {
            const customer = {
                username,
                name,
                gender,
                email,
                phone,
                password: hashedPassword, // Store the hashed password
                role
            };

            Customer.findByIdAndUpdate(req.params.id, customer, { new: true })
                .then((doc) => {
                    if (doc) {
                        res.json(doc);
                    } else {
                        res.status(404).send("Customer not found");
                    }
                })
                .catch((err) => {
                    console.log("Error in Customer Update: " + err);
                    res.status(500).send("Internal Server Error");
                });
        }
    });
});

router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record with given id:" + req.params.id);
    }

    Customer.findByIdAndDelete(req.params.id).then((doc) => {
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).send("Customer not found");
        }
    })
});

// router.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     // Find the user in the database based on the username
//     Customer.findOne({ username })
//         .then((user) => {
//             if (!user) {
//                 // User not found, authentication failed
//                 res.status(401).send("Invalid username or password");
//                 return;
//             }

//             // Compare the entered password with the hashed password stored in the database
//             bcrypt.compare(password, user.password, (err, result) => {
//                 if (err) {
//                     console.log("Error comparing passwords: " + err);
//                     res.status(500).send("Internal Server Error");
//                 } else if (result) {
//                     // Passwords match, authentication successful
//                     res.status(200).json({ message: "Login successful", role: user.role });
//                 } else {
//                     // Passwords don't match, authentication failed
//                     res.status(401).send("Invalid username or password");
//                 }
//             });
//         })
//         .catch((err) => {
//             console.log("Error in finding user: " + err);
//             res.status(500).send("Internal Server Error");
//         });
// });

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        let admin = await Admin.findOne({ username });
        if (admin) {
            // Admin found, perform authentication
            let result = await bcrypt.compare(password, admin.password);

            if (result) {
                // Passwords match, admin authentication successful
                const token = jwt.sign(
                    { userId: admin._id, admin: admin.username },
                    secretKey,
                    { expiresIn: "1h" } // Token expires in 1 hour
                );

                res.status(200).json({ message: "Login successful", role: admin.role, user: admin, token });
            } else {
                // Passwords don't match, authentication failed
                res.status(401).send("Invalid username or password");
            }
        } else {
            // If admin not found, check if the user is a customer
            let customer = await Customer.findOne({ username });

            if (customer) {
                // Customer found, perform authentication
                let result = await bcrypt.compare(password, customer.password);

                if (result) {
                    // Passwords match, customer authentication successful
                    const token = jwt.sign(
                        { userId: customer._id, username: customer.username },
                        secretKey,
                        { expiresIn: "1h" } // Token expires in 1 hour
                    );
                    res.status(200).json({ message: "Login successful", role: customer.role, user: customer, token });
                } else {
                    // Passwords don't match, authentication failed
                    res.status(401).send("Invalid username or password");
                }
            } else {
                let employee = await Employee.findOne({ username });

                if (employee) {
                    let result = await bcrypt.compare(password, employee.password);

                    if (result) {
                        // Passwords match, customer authentication successful
                        const token = jwt.sign(
                            { userId: employee._id, username: employee.username },
                            secretKey,
                            { expiresIn: "1h" } // Token expires in 1 hour
                        );
                        res.status(200).json({ message: "Login successful", role: employee.role, user: employee, token });
                    } else {
                        // Passwords don't match, authentication failed
                        res.status(401).send("Invalid username or password");
                    }
                }
                else {
                    // Neither admin, employee nor customer found, authentication failed
                    res.status(401).send("Invalid username or password");
                }

            }
        }
    } catch (error) {
        console.log("Error during login: " + error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/forgot-password", (req, res) => {
    const { email } = req.body;

    Customer.findOne({ email }).then((user) => {
        if (!user) {
            // User not found, authentication failed
            res.status(401).send("Invalid email");
            return;
        }

        const resetCode = generateRandomString(8).toUpperCase();

        user.resetCode = resetCode; // Store the reset code in the user object
        user.save(); // Save the user object with the reset code
        console.log(user.resetCode);

        sendMail(user, resetCode)
            .then((info) => {
                res.send(info);
            })
            .catch((error) => {
                res.status(500).send("Error sending email");
            });
    });
});

async function sendMail(user, resetCode) {
    const imageUrl = "https://cdn.dribbble.com/users/8502068/screenshots/16260707/media/a5db92818dd4b9676fba3f7c8ca48fa6.jpg";


    let mailOptions = {
        // from: 'example@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Нулиране На Парола", // Subject line
        html: `<h1 style="text-align: center">Здравейте, ${user.name}!</h1><br> <p>Нулирахте паролата си!</p> <p>Вашият код за потвърждение е: <b style="font-size: 20px;">${resetCode}</b></p> <h4>Благодарим много, че използвате нашите услуги!</h4><div style="display: flex; align-items: center;">
        <img src="${imageUrl}" alt="Logo" style="width: 150px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); margin-right: 10px;">
      </div>
      <div>
          <p>Поздрави от екипът на Kpuc's Pizzeria</p>
          <p>+359 828 2344 42</p>
          <p>Адрес: ул. Ивац Войвода 23, гр. Варна</p>
        </div>
        `
    };

    return new Promise((resolve, reject) => {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                reject(error);
            } else {
                console.log(`The mail has been sent and the id is ${info.messageId}`);
                resolve(info);
            }
        });
    });
}

router.post("/verify-reset-code", (req, res) => {
    const { email, resetCode } = req.body;

    Customer.findOne({ email }).then((user) => {
        if (!user) {
            res.status(401).send("Invalid email");
            return;
        }

        console.log(user.resetCode);
        console.log(resetCode);

        if (user.resetCode === resetCode) {
            // Code matches, return true
            res.send(true);
        } else {
            // Code doesn't match, return false
            res.send(false);
        }
    });
});


router.put('/update-password-by-email/:email', (req, res) => {
    const { email } = req.params;
    const { password } = req.body;

    // Hash the new password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log('Error hashing password:', err);
            res.status(500).send('Internal Server Error');
        } else {
            Customer.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
                .then((doc) => {
                    if (doc) {
                        res.json(doc);
                    } else {
                        res.status(404).send('Customer not found');
                    }
                })
                .catch((err) => {
                    console.log('Error updating password:', err);
                    res.status(500).send('Internal Server Error');
                });
        }
    });
});

router.get("/:id/orders", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record with given id: " + req.params.id);
    }

    Order.find({ customerId: req.params.id })
        .then((orders) => {
            res.json(orders);
        })
        .catch((err) => {
            console.log("Error in Retrieving Orders: " + err);
            res.status(500).send("Internal Server Error");
        });
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

module.exports = router;
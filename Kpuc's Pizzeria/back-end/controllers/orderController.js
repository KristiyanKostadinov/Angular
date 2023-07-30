const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const details = require("../credentials.json");
const { Vonage } = require('@vonage/server-sdk')
const accountSid = 'ACb63ef2256141ddf2440498af34d1c3b3';
const authToken = 'f9ca16fb8d6ac045b00477d980aa0699';
const client = require('twilio')(accountSid, authToken);

const vonage = new Vonage({
  apiKey: "ebfa5294",
  apiSecret: "2PAXoyGQbJw07v1Z"
})

const statusTranslations = {
  "Pending": "в процес на приемане",
  "In Process": "в процес на изпълнение",
  "Ready": "приготвена",
  "Picked up and heading towards you": "взета и пътува към Вас",
  "Delivered": "доставена",
  // Add more status translations as needed
};

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const phone = "359884636136"
    const from = "Kpuc's Pizzeria"
    const text = "\n Успешно направена поръчка! Очаквайте доставка до 45 минути. Благодаря, че използвахте нашите услуги! Поздрави от екипа на Kpuc's Pizzeria"
    // Send email and SMS notification

    const translatedStatus = statusTranslations[order.status] || order.status;
    order.status = translatedStatus;

    await sendMail(order.email, order.name, translatedStatus);
    // await sendSMS(phone, from, text);

    client.messages
      .create({
        body: text,
        from: '+14178073336', // Your Twilio phone number
        to: order.phone // Recipient phone number
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the order." });
  }
});

// Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders by user ID." });
  }
});

router.post("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderToReorder = await Order.findById(orderId);
    if (!orderToReorder) {
      return res.status(404).json({ error: "Order not found." });
    }
    const reorderedOrder = await Order.create(orderToReorder.toObject());
    res.status(201).json(reorderedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to reorder the order." });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// Get a single order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the order." });
  }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updatedOrder, {
      new: true
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Translate the status value
    const translatedStatus = statusTranslations[order.status] || order.status;
    order.status = translatedStatus;

    // Send email notification
    await sendUpdateMail(order.email, order.name, translatedStatus);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the order." });
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the order." });
  }
});


function sendMail(email, name, status) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: details.email,
      pass: details.password
    },
  });
  const imageUrl = "https://cdn.dribbble.com/users/8502068/screenshots/16260707/media/a5db92818dd4b9676fba3f7c8ca48fa6.jpg";

  let mailOptions = {
    // from: 'example@gmail.com', // sender address
    to: email, // recipient's email address
    subject: "Потвърждение на Ваша поръчка",
    html: `<h1 style="text-align: center">Здравейте, ${name}!</h1>
    <br><br>
    <p>Вашата поръчка е ${status}!</p>
    <h4>Благодарим много, че използвате нашите услуги!</h4>
    <div style="display: flex; align-items: center;">
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

function sendUpdateMail(email, name, status) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: details.email,
      pass: details.password
    },
  });

  const imageUrl = "https://cdn.dribbble.com/users/8502068/screenshots/16260707/media/a5db92818dd4b9676fba3f7c8ca48fa6.jpg";

  let mailOptions = {
    // from: 'example@gmail.com', // sender address
    to: email, // recipient's email address
    subject: "Потвърждение на Ваша поръчка",
    html: `<h1 style="text-align: center">Здравейте, ${name}!</h1>
    <br><br>
    <p>Вашата поръчка е ${status}!</p>
    <h4>Благодарим много, че използвате нашите услуги!</h4>
    <div style="display: flex; align-items: center;">
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

async function sendSMS(to, from, text) {
  await vonage.sms.send({ to, from, text })
    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;  // Fallback port
const DELAY_SECONDS = 15 * 1000;  // 30 seconds in milliseconds

// Middleware
app.use(cors());
app.use(express.json());  // Use express.json() for JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Updated email schema with 'isComingSoon' field
const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    isComingSoon: { type: Boolean, default: true }  // Initially set to false
});

const Subscriber = mongoose.model('Subscriber', emailSchema);

// Nodemailer setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587, // Gmail SMTP port
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASS // Your app password
    }
});

// API route for subscribing
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Save email to database with isComingSoon = false by default
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send confirmation email
        const mailOptions = {
            from: `Your Store <${process.env.EMAIL}>`,
            to: email,
            subject: 'Subscription Confirmation',
            text: 'Thank you for subscribing to our online store. You will receive $15 credit for your next purchase!'
        };

        // Sending the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent:', info.response);

        return res.status(200).json({ message: 'Subscription successful, confirmation email sent.' });

    } catch (error) {
        if (error.code === 11000) {  // Duplicate key error (email already exists)
            return res.status(400).json({ error: 'This email is already subscribed.' });
        }
        console.error('Error during subscription:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Function to send the "Website Live" email
// Function to send the "Website Live" email
const sendLiveNotificationEmails = async () => {
    try {
        const subscribers = await Subscriber.find({ isComingSoon: true });  // Only send to those with isComingSoon = true

        for (const subscriber of subscribers) {
            const followUpMailOptions = {
                from: `Your Store <${process.env.EMAIL}>`,
                to: subscriber.email,
                subject: 'Website Live Notification',
                text: 'Good news! The website is now live and ready for use. Visit it here: [https://google.com].'
            };

            // Send the follow-up email
            await transporter.sendMail(followUpMailOptions);
            console.log(`Follow-up email sent to: ${subscriber.email}`);

            // Update the subscriber's 'isComingSoon' status to false
            await Subscriber.findOneAndUpdate(
                { email: subscriber.email },
                { isComingSoon: false }
            );
        }

        console.log('All follow-up emails sent.');

    } catch (error) {
        console.error('Error while sending follow-up emails:', error);
    }
};



// Function to trigger email sending after 30-second delay
const startDelayedEmails = () => {
    console.log(`Waiting for ${DELAY_SECONDS / 1000} seconds before sending emails...`);
    setTimeout(() => {
        sendLiveNotificationEmails();
    }, DELAY_SECONDS);
};

// Trigger the delayed email sending (e.g., after the server starts or based on a specific action)
startDelayedEmails();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
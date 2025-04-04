<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Set the recipient email address
    $to = 'mayaabapo87@gmail.com';  // Replace with your email address

    // Set the email subject
    $email_subject = "New Contact Form Submission: $subject";

    // Construct the email body
    $email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Set email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo 'Message sent successfully!';
    } else {
        echo 'There was an error sending the message.';
    }
}
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $firstName = htmlspecialchars(trim($_POST["firstname"]));
    $lastName = htmlspecialchars(trim($_POST["lastname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }
    // Your email address
    // sghantdavid@yahoo.com
    // hello@shakirahjohnson.com
    $to = "sghantdavid@yahoo.com";
    $email_subject = "New Contact Form Submission";
    $email_body = "New contact form submission:\n\n" .
                  "Name: $firstName $lastName\n" .
                  "Email: $email\n" .
                  "Message:\n$subject";
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Thank you for your message. It has been sent.";
        // Redirect to thank-you page
        header("Location: ../pages/thank-you.html");
        exit();
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
---
layout: null
---
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>

<body>
    <h1 id="title"> Formulario! </h1>
    <p id="description"> Preencha! </p>
    <form action="https://httpbin.org/get" method="get" id="survey-form">
        <fieldset>
            <p>
                <label for="text" id="name-label">Name</label>
                <input type="text" name="name" id="name" required placeholder="Enter you name">
            </p>
            <p>
                <label for="email" id="email-label">Email</label>
                <input type="email" name="email" id="email" required placeholder="Enter your email">
            </p>
            <p>
                <label for="number" id="number-label">Age (optional)</label>
                <input type="number" name="number" id="number" min="0" max="999" placeholder="Age">
            </p>
            <p>
                <label for="roles">How would you describe your role:</label>
                <select name="roles" id="dropdown">
                    <option value="">--Please choose an option--</option>
                    <option value="C-Level">C-Level</option>
                    <option value="Manager">Manager</option>
                    <option value="Associate">Associate</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>

            </p>
            <p>
                <legend>Did you like your role?</legend>
                <input type="radio" name="like_role" id="yes" value="yes">
                <label for="yes"> Yes </label>
                <input type="radio" name="like_role" id="no" value="no">
                <label for="no"> No </label>
                <input type="radio" name="like_role" id="maybe" value="maybe">
                <label for="maybe"> Maybe </label>
            </p>
            <p>
                <legend>Favorite stack</legend>
                <input type="checkbox" name="stack" id="django" value="django">
                <label for="django">Django</label>
                <input type="checkbox" name="stack" id="mern" value="mern">
                <label for="mern">MERN</label>
                <input type="checkbox" name="stack" id="mean" value="mean">
                <label for="mearn">MEAN</label>
            </p>
            <p>
                <legend>Send Me A Note</legend>
                <label for="message">Your Message:</label>
                <br>
                <textarea name="message" id="message" cols="30" rows="10"
                    placeholder="Type your message here"></textarea>
            </p>
        </fieldset>
        <button type="submit" formaction="https://httpbin.org/post" formmethod="post" id="submit">Send</button>
        <button type="reset">Reset</button>
    </form>
</body>

</html>
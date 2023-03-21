---
title: "Formulario"
excerpt: "Teste de formulario."
sitemap: false
permalink: /formulario.html
layout: null
---
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
        <button type="submit" formaction="https://httpbin.org/post" formmethod="post" id="submit">Send</button>
        <button type="reset">Reset</button>
    </form>
</body>

</html>

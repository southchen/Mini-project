<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productivity App</title>
    <link rel="stylesheet" href="todo-min.css">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link href="https://cdn.bootcdn.net/ajax/libs/semantic-ui/2.4.1/components/menu.css" rel="stylesheet">
    <link href="https://cdn.bootcdn.net/ajax/libs/semantic-ui/2.4.1/components/input.min.css" rel="stylesheet">
    <link href="https://cdn.bootcdn.net/ajax/libs/semantic-ui/2.4.1/components/button.min.css" rel="stylesheet">
</head>

<body class="init">
    <header class="init">
        <h1>My Tiny Productivity App</h1>
        <p id='time'> </p>
        <div class="ui compact menu">
            <div class="link item" id='night'><i class="fa fa-moon-o"></i></div>
            <div class="link item" id='day'><i class="fa fa-sun-o"></i></div>
        </div>

    </header>


    <main class="list-container">
        <div class='todoinput'>

            <form action"submit" class='add'>
                <label for="todo"></label>
                <div class="ui input inverted segment">
                    <input type="text" name="todo" id="todo" placeholder="add a new todo or dbl click to edit"
                        autocomplete='off'>
                </div>

            </form>
        </div>
        <ul id="list">
            <li><input type="checkbox"><span>test item</span></li>
        </ul>

    </main>
    <div class="timer">
        <div class="ui input inverted segment">
            <input id="countdowntime" type="text" placeholder="Set up a timer in minutes">
        </div>
        <div class='btns'>
            <button class="ui teal basic button" id='countdown'>Countdown!</button>
            <button class="ui pink basic button" id='stop'>Stop</button>
            <button class="ui grey basic button" id='hide'>Hide the timer</button>

        </div>

        <h1 class=" displaytime"></h1>
    </div>
    <script src='todo.js'>

    </script>

</body>

</html>

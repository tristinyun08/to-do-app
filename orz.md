authentication requires database 
set up database with sv cli search up how to do it and youre going to install drizzle plugin for sveltekit the cli will setup drizzle for you after you have that setup you can do youre authenticaiton but after you set it up you wont automaticlaly have sign in page so you have to make that too 
also your auth i will let u choose between two options between email pass or sign in with google but one is easier so figure that out
set up authentication by using this library called betterauth and llm is going to epic fail so youre going to read the really easy to use guide that tells you how to do it 
set up register and signin page
keep simple email field and password field for signin and register
delete localstorage saving thing and replace with database
save todos in database
setup database schema with todos i want to save
schema will look like:
users table from betterauth
make new field inside of users table called todos, its going to be a json blob
inside field store todos
create an api endpoint to save 
your api endpiont is going to be a post endpoint
post endpoint is going to take in a json body which contains the list of todos
post endpoint take in list of todos and update users table that contains blob of todos
endpooint called savetodos
you also ahve to deal with loading todos, when user joins page for first time you need to load todos.
add latex rendering (only single dollar sign)
use katex library for latex rendering

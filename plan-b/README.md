# MemoryGame
 Django Framework with Python, HTML, CSS, Javascript, JQuery, AJAX
 
Django/Linux Commands

Memory Game - Documents/Github/memory/msite
Vis Inspect Tool - Desktop/Vis_Inspect_Tool/InspectTool

*cd -> Change Directory -> cd Desktop/…/…
*ls -> list all folders in directory -> ls


1. Change Directory to where you want your Project stored using cd
2. Create Django Project in desired folder-> django-admin startproject [name of project]
    1. This will install all files needed to run web app
3. install Django into Project Folder -> pip3 install django
4. Create a virtual environment that will host your web app, typically a localhost for development, AWS for Production
    1. -> virtualenv [name of environment]
        1. Activate environment before running server -> source [name of environment]/bin/activate
        2. To deactive (Turn off server when done -> deactivate
5. To run the server to start web app, make sure you see manage.py in ls on terminal
    1. -> python manage.py rumserver
6. After making changes to models(database) you have to push the changes to the server (recompile)
    1. -> python manage.py migrate
    2. Then -> python manage.py makemigrations

Create new environment: virtualenv [nameenv]

Active environment: source [nameenv]/bin/activate

MAC TERMINAL
Kill process: Ctrl+C
Clear Terminal: Ctrl+K

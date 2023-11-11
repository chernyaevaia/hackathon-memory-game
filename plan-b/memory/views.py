from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


from .forms import InputForm
from .models import InputModel, LeaderBoard

# Create your views here.

def signup(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('home')
    return render(request, 'memory/signup.html', {'form': form})

def logout(request):
    logout(request)

def loginView(request):

    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    form = AuthenticationForm()
    return render(request,"registration/login.html",{
        "form":form
    })
@login_required
def home(request):
    # inputs = InputModel.object.all()
    if request.method == 'POST':
        InputModel.objects.all().delete()
        form = InputForm(request.POST)
        if form.is_valid():
            data = InputModel.objects.all()
            form.save()
            return render(request,"memory/game.html", {'data': data} )
        return redirect('game')
    else:
        form = InputForm()
    return render(request, "memory/index.html", {
        'form':form,
    })

@csrf_exempt
def upload(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method =="POST":
    #if request.is_ajax(request=request) and request.method =="POST":
    #if request.method == "POST":
        # print(request.POST.getlist('Name')[0])
        # print(request.POST.getlist('Difficulty')[0])
        # print(request.POST.getlist('flips')[0])
        # print(request.POST.getlist('solvetime')[0])
        #if LeaderBoard.objects.count() < 10:
        lb = LeaderBoard(Name=request.POST.getlist('Name')[0],Difficulty=request.POST.getlist('Difficulty')[0],flips=request.POST.getlist('flips')[0],timeleft=request.POST.getlist('solvetime')[0])
        lb.save()
    return redirect('game')


def game(request):
    #player_info = InputModel.objects.all()
    return render(request, "memory/game.html")

def leaderboard(request):
    leaderboard = LeaderBoard.objects.all()
    return render(request, "memory/leaderboard.html", { 'leaderboard': leaderboard})

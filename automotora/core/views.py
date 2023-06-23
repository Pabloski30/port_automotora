from django.shortcuts import render,redirect
from .models import Marca,Automovil
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth import authenticate, login


# Create your views here.


def home(request):
    return render(request, 'core/home.html')

def galeria (request):
    return render(request, 'core/galeria.html')

def formulario(request):
    marcas = Marca.objects.all()
    variables = {
        'marcas': marcas
    }
    
    if request.POST:
        auto = Automovil()
        auto.patente = request.POST.get('txtPatente')
        auto.modelo = request.POST.get('txtModelo')
        auto.anio = request.POST.get('txtAnio')
        marca_id = request.POST.get('cboMarca')
        marca = Marca.objects.get(id=marca_id)
        auto.marca = marca
        
        try:
            auto.save()
            variables['mensaje'] = 'Guardado correctamente'
        except:
            variables['mensaje'] = 'No se ha podido guardar'
    
    return render(request, 'core/formulario.html', variables)



#Crud de automovil
def listar_automoviles(request):
    
    autos = Automovil.objects.all
    
    return render(request, 'core/listar_automoviles.html',{
        'autos':autos
    })
    
    
def eliminar_automovil(request,id):
    #buscar el automovil que queremos eliminar
    
    auto = Automovil.objects.get(id=id)
    
    try:
        auto.delete()
        mensaje="Eliminado correctamente"
        messages.success(request, mensaje)
    except:
        mensaje="No se ha podido eliminar"
        messages.error(request, mensaje)
    
    return redirect('listado_automoviles')
    
def modificar_automovil(request, id):
    # Buscamos el automovil para que el usuario pueda modificarlo
    auto = Automovil.objects.get(id=id)
    marcas = Marca.objects.all()
    variables = {
        'auto': auto,
        'marcas': marcas
    }
    
    if request.POST:
        auto = Automovil()
        auto.id= request.POST.get('txtId')
        auto.patente = request.POST.get('txtPatente')
        auto.modelo = request.POST.get('txtModelo')
        auto.anio = request.POST.get('txtAnio')
        marca_id = request.POST.get('cboMarca')
        marca = Marca.objects.get(id=marca_id)
        auto.marca = marca
        
        try: 
            auto.save()
            messages.success(request,'modificado correctamente')
        except:
            messages.error (request,  'no se ha podido modificar')
        return redirect('listado_automoviles')
    return render(request, 'core/modificar_automovil.html', variables)


def registro(request):
    data={
        'form': CustomUserCreationForm()
    }
    if request.method == 'POST':
        formulario = CustomUserCreationForm(data=request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(username=formulario.cleaned_data["username"],password=formulario.cleaned_data["password1"])
            login(request,user)
            messages.success(request,"Te has registrado correctamente")
            return redirect(to="home")
        data["form"] = formulario
    return render(request, 'registration/registro.html',data)
    
    
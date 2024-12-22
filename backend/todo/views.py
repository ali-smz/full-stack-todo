from django.shortcuts import render
from rest_framework import viewsets , generics , filters
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['body']  

    
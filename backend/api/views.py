from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    authentication_classes = [] 
    permission_classes = [AllowAny]


class TransactionRetrieveUpdateDestroyeView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = "id"
    authentication_classes = []
    permission_classes = [AllowAny]
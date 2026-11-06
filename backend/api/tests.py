from django.test import TestCase
from .models import Transaction


class TransactionDeleteTests(TestCase):
    def test_delete_transaction(self):
        transaction = Transaction.objects.create(text="Test", amount=10)

        response = self.client.delete(f"/api/transactions/{transaction.id}/")

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Transaction.objects.filter(id=transaction.id).exists())

from .models import History


def create_history_entry(status: str, website_name: str) -> None:
    history = History.objects.create(
        status=status,
        website_name=website_name,
    )

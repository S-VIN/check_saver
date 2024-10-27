from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    name: str
    volume: str
    brand: str
    category: str

class Purchase(BaseModel):
    product_id: int
    price: int
    quantity: Optional[int] = 1
    tags: Optional[List[str]] = None

class Check(BaseModel):
    purchase_ids: List[int]
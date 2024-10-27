from model import Purchase, Product, Check
from fastapi import HTTPException
from router import router


import psycopg2

try:
    conn = psycopg2.connect(dbname='check_saver', user='postgres', password='postgres', host='localhost', port='5400')
except:
    print('Can`t establish connection to database')


# Endpoint to add a new product
@router.post("/products/")
async def add_product(product: Product):
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO products (name, volume, brand, category) VALUES (%s, %s, %s, %s) RETURNING id",
            (product.name, product.volume, product.brand, product.category)
        )
        product_id = cur.fetchone()[0]
        conn.commit()
        return {"product_id": product_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Failed to add product")

# Endpoint to add a new purchase
@router.post("/purchases/")
async def add_purchase(purchase: Purchase):
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO purchases (product_id, price, quantity, tags) VALUES (%s, %s, %s, %s) RETURNING id",
            (purchase.product_id, purchase.price, purchase.quantity, purchase.tags)
        )
        purchase_id = cur.fetchone()[0]
        conn.commit()
        return {"purchase_id": purchase_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Failed to add purchase")

# Endpoint to add a new check
@router.post("/checks/")
async def add_check(check: Check):
    cur = conn.cursor()
    try:
        array_values = ','.join(map(str, check.purchase_ids))
        query = "INSERT INTO checks (purchase_ids) VALUES (ARRAY[" + array_values + "]) RETURNING id"
        cur.execute(query)
        check_id = cur.fetchone()[0]
        conn.commit()
        return {"check_id": check_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Failed to add check")
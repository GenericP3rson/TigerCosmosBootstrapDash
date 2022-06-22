from typing import Optional  
from fastapi import FastAPI 
import pyTigerGraph as tg
from fastapi.middleware.cors import CORSMiddleware

# conn = tg.TigerGraphConnection(host="https://wikigraph.i.tgcloud.io/", graphname="WikiGraph")
conn = tg.TigerGraphConnection(host="https://bleve.i.tgcloud.io/", graphname="NotMyGraph")
conn.apiToken = conn.getToken(conn.createSecret())

app = FastAPI()   

origins = [
    "http://localhost:1234/",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
def read_root():
     return {"Hello": "World"}   

@app.get("/vertices")
def get_vertices():
     return {"vertices": conn.getVertices("Doc")}

@app.get("/edges")
def get_edges():
     return {"vertices": conn.getVertices("Doc"), "edges": conn.getEdgesByType("LINKS_TO")}
     # return {"vertices": conn.getVertices("Doc"), "edges": conn.getEdgesByType("LINKS_TO"), "entities": conn.getVertices("Entity"), "entity_links": conn.getEdgesByType("DOC_ENTITY")}


@app.get("/items/{item_id}") 
def read_item(item_id: int, q: Optional[str] = None):
     return {"item_id": item_id, "q": q}

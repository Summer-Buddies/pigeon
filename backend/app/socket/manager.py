from fastapi import WebSocket, APIRouter, WebSocketDisconnect

ws_router = APIRouter()
connected_clients = set()

@ws_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for conn in connected_clients:
                if conn != websocket:
                    await conn.send_text(data)
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

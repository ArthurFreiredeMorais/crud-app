import socket

# Configurações do servidor
HOST = '0.0.0.0'   # Escuta em todas as interfaces disponíveis
PORT = 23       # Número da porta arbitrário

# Criação do socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Liga o socket ao endereço e porta especificados
server_socket.bind((HOST, PORT))

# Começa a escutar por conexões entrantes
server_socket.listen()

print(f"Servidor socket escutando em {HOST}:{PORT}")

# Loop principal para aceitar conexões entrantes
while True:
    # Aceita a conexão entrante
    client_socket, client_address = server_socket.accept()
    
    print(f"Conexão recebida de {client_address}")
    
    # Loop para receber e repetir mensagens
    while True:
        # Recebe os dados do cliente
        data = client_socket.recv(1024)
        
        if not data:
            # Se não houver mais dados, fecha a conexão com o cliente
            print(f"Conexão fechada por {client_address}")
            client_socket.close()
            break
        
        # Decodifica os dados recebidos e exibe
        received_message = data.decode()
        print(f"Recebido: {received_message}")
        
        # Envia de volta os dados recebidos para o cliente
        client_socket.sendall(data)

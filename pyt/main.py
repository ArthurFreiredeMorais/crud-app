import telnetlib

def telnet_connect(host):
    try:
        # Conectando ao host via Telnet
        tn = telnetlib.Telnet(host)

        # Loop para receber comandos e enviar respostas
        while True:
            command = input("Digite um comando (1 ou 2 para testar): ")

            # Verifica o comando digitado
            if command == '1':
                print("Enviando comando: 1")
                tn.write(b"1\n")
            elif command == '2':
                print("Enviando comando: 2")
                tn.write(b"2\n")
            else:
                print("Comando inválido. Digite 1 ou 2.")

            # Lê a resposta do servidor Telnet
            print("Resposta do servidor:")
            print(tn.read_until(b"\n").decode('ascii').strip())

    except Exception as e:
        print("Erro ao conectar via Telnet:", e)

    finally:
        # Fecha a conexão Telnet ao sair do loop
        tn.close()

host = '10.0.30.106'


telnet_connect(host)

 

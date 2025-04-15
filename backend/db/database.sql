CREATE DATABASE IF NOT EXISTS db_linguagens_programacao;

USE db_linguagens_programacao;

CREATE TABLE IF NOT EXISTS Linguagens (
  id INT AUTO_INCREMENT PRIMARY KEY,                          
  nome VARCHAR(100) NOT NULL UNIQUE,                          
  ano_criacao YEAR NULL,                                      
  criador VARCHAR(255) NULL,                                  
  paradigma_principal VARCHAR(100) NULL,                      
  tipagem VARCHAR(100) NULL,                                  
  site_oficial VARCHAR(255) NULL,                             
  descricao TEXT NULL
);

CREATE TABLE IF NOT EXISTS Paradigmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Linguagem_Paradigma (
  linguagem_id INT NOT NULL,
  paradigma_id INT NOT NULL,
  PRIMARY KEY (linguagem_id, paradigma_id),
  FOREIGN KEY (linguagem_id) REFERENCES Linguagens(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (paradigma_id) REFERENCES Paradigmas(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,    
    site_web VARCHAR(255) NULL,            
    setor VARCHAR(100) NULL               
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Linguagem_Empresa (
    linguagem_id INT NOT NULL,
    empresa_id INT NOT NULL,
    PRIMARY KEY (linguagem_id, empresa_id),
    FOREIGN KEY (linguagem_id) REFERENCES Linguagens(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES Empresas(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

INSERT IGNORE INTO Paradigmas (nome) VALUES
('Orientado a Objetos'),
('Funcional'),
('Procedural'),
('Imperativo'),
('Declarativo'),
('Lógico'),
('Scripting'),
('Multiparadigma');

INSERT IGNORE INTO Linguagens (nome, ano_criacao, criador, paradigma_principal, tipagem, site_oficial, descricao) VALUES
('Python', 1991, 'Guido van Rossum', 'Multiparadigma', 'Dinâmica e Forte', 'https://www.python.org/', 'Linguagem de alto nível, interpretada, de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.'),
('Java', 1995, 'Sun Microsystems (James Gosling)', 'Orientado a Objetos', 'Estática e Forte', 'https://www.java.com/', 'Linguagem orientada a objetos, compilada para bytecode, executada em máquina virtual (JVM). Write Once, Run Anywhere.'),
('JavaScript', 1995, 'Brendan Eich (Netscape)', 'Multiparadigma', 'Dinâmica e Fraca', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'Linguagem de script de alto nível, principalmente usada no desenvolvimento web client-side, mas também popular no server-side (Node.js).'),
('C++', 1985, 'Bjarne Stroustrup', 'Multiparadigma', 'Estática e Forte', 'https://isocpp.org/', 'Extensão da linguagem C com suporte a orientação a objetos.');

INSERT IGNORE INTO Linguagem_Paradigma (linguagem_id, paradigma_id) VALUES
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Paradigmas WHERE nome = 'Orientado a Objetos')),
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Paradigmas WHERE nome = 'Funcional')),
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Paradigmas WHERE nome = 'Procedural')),
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Paradigmas WHERE nome = 'Imperativo')),
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Paradigmas WHERE nome = 'Scripting')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Paradigmas WHERE nome = 'Orientado a Objetos')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Paradigmas WHERE nome = 'Imperativo')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Paradigmas WHERE nome = 'Scripting')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Paradigmas WHERE nome = 'Orientado a Objetos')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Paradigmas WHERE nome = 'Funcional')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Paradigmas WHERE nome = 'Imperativo')),
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Paradigmas WHERE nome = 'Orientado a Objetos')),
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Paradigmas WHERE nome = 'Procedural')),
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Paradigmas WHERE nome = 'Imperativo'));

INSERT IGNORE INTO Empresas (nome, site_web, setor) VALUES
('Google', 'https://about.google/', 'Tecnologia'),
('Meta', 'https://about.meta.com/', 'Tecnologia'),
('Netflix', 'https://about.netflix.com/', 'Entretenimento'),
('Amazon', 'https://www.aboutamazon.com/', 'Tecnologia/Varejo'),
('Microsoft', 'https://www.microsoft.com/', 'Tecnologia');


INSERT IGNORE INTO Linguagem_Empresa (linguagem_id, empresa_id) VALUES
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Empresas WHERE nome = 'Google')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Empresas WHERE nome = 'Google')),
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Empresas WHERE nome = 'Google')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Empresas WHERE nome = 'Google'));

INSERT IGNORE INTO Linguagem_Empresa (linguagem_id, empresa_id) VALUES
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Empresas WHERE nome = 'Meta')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Empresas WHERE nome = 'Meta')),
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Empresas WHERE nome = 'Meta')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Empresas WHERE nome = 'Meta'));

INSERT IGNORE INTO Linguagem_Empresa (linguagem_id, empresa_id) VALUES
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Empresas WHERE nome = 'Netflix')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Empresas WHERE nome = 'Netflix')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Empresas WHERE nome = 'Netflix'));

INSERT IGNORE INTO Linguagem_Empresa (linguagem_id, empresa_id) VALUES
((SELECT id FROM Linguagens WHERE nome = 'C++'), (SELECT id FROM Empresas WHERE nome = 'Microsoft')),
((SELECT id FROM Linguagens WHERE nome = 'Java'), (SELECT id FROM Empresas WHERE nome = 'Microsoft')),
((SELECT id FROM Linguagens WHERE nome = 'Python'), (SELECT id FROM Empresas WHERE nome = 'Microsoft')),
((SELECT id FROM Linguagens WHERE nome = 'JavaScript'), (SELECT id FROM Empresas WHERE nome = 'Microsoft'));
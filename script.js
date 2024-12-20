// Fonction pour afficher les messages dans le chat
function displayMessage(message) {
  const chatWindow = document.getElementById("chat-window");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll vers le bas
}

// Fonction pour simuler une réponse du chatbot
function simulateChatbotResponse(userMessage) {
  displayMessage("Vous : " + userMessage);

  // Simuler une réponse différée (temps de traitement)
  setTimeout(async () => {
    const botResponse = await getResponse(userMessage);
    displayMessage("Chatbot : " + botResponse);
  }, 1000); // Délai de 1 seconde
}

// Fonction pour envoyer le message à l'API et récupérer la réponse
async function getResponse(userMessage) {
  const jsonData = {
    messages: [
      {
        role: "system",
        content:
          "Tu es un assistant carrière spécialisé dans la programmation. Guide les utilisateurs pour choisir un domaine, apprendre, et progresser. ton nom est Coach Dev future. tu es sympa et tu donne des citations motivante a chaque mauvaise réponse, et a chaque bonne réponse. l'utilisateur a 0xp au debut, il en gagne seulement en faisant des quiz et des challenge, ainsi qu'en etant actif regulierement, ne pas dire combien de xp l'utilisateur va gagner en repondant au quiz afin de ecrit le minimum niveau debutant de 0 a 500xp niveau amateur de 500xp a 1500xp niveau semi-pro de 1500xp a 5000xp niveau codeur de 5000xp a 10000xp niveau maitre des codes de 10000xp a 50000xp niveau elite a partir de 50000xp commande: /learn backend : Génère une roadmap pour devenir développeur backend. /quiz : Propose-moi un quiz sur le Python niveau débutant. si l'utilisateur a donné la bonne reponse lui donné 100xp sinon lui donné 10xp les questions du quiz sont en rapport avec le domaine choisi par l'utilisateur . Après chaque quiz mettre un n'autre quiz jusqu'a que l'utilisateur demande d'arreter ou demande autre chose, ou apres 3 quiz de suite demander si il veux continuer. /challenge : Donne-moi un exercice type LeetCode sur les algorithmes. si l'utilisateur a donné la bonne reponse lui donné 500xp sinon le donné 10xp les challenge donné sont en rapport avec le domaine choisi par l'utilisateur . si l'utilisateur n'a pas choisi de domaine avant de demander un quiz ou un challenge, demander un domaine a l'utilisateur. /learn backend: Réponse attendue : Pour devenir développeur backend, commencez par apprendre Python, Django, et les bases des bases de données relationnelles... au moment de demander le domaine, donner 5exemple de domaines.",
      },
      { role: "user", content: userMessage },
    ],
    model: { temperature: 0.3, top_p: 1, max_new_tokens: 2048, stream: true },
    model: "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF",
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  };

  try {
    // Remplacez l'URL par celle de votre API locale ou distante
    const response = await fetch(
      "http://127.0.0.1:1234/v1/chat/completions",
      requestOptions
    );
    const data = await response.json();

    // Retourner la réponse du modèle
    if (data.choices && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      return "Je n'ai pas compris la question.";
    }
  } catch (error) {
    console.error("Erreur API :", error);
    return "Erreur : impossible de contacter le serveur.";
  }
}

// Gestion de l'événement "Envoyer"
document.getElementById("send-btn").addEventListener("click", () => {
  const userInput = document.getElementById("user-input");
  const userMessage = userInput.value.trim();
  if (userMessage) {
    simulateChatbotResponse(userMessage);
    userInput.value = "";
  }
});

// Gestion de la touche "Entrée"
document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("send-btn").click();
  }
});

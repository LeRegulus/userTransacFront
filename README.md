# Inerface de gestion des utilisateurs et transactions financières

Cette UI permet à des utilisateurs de gerer leurs transactions financières. Elle est sécurisée avec un mécanisme d'authentification login et Register avant de creer des transactions et de les consulter.

# Components

1. Le Register Component qui pert l'insciption des utilisateurs avec un formulaire et des champs commes le Nom complet l'email et le password
2. Le Login Component qui permet apre le register de se connecter sur son compte avec son email et son password. Si c'est derniers sont valides l'app te redirige vers les transactions
3. Le Component Trasanction avec ces deux deux sous components liste et Create qui affiche respectivement la liste des transaction effectues par l'utilisateur et le formulaire pour enregistrer une transaction

# Securite

1. Login: Connexion grace a un email et un password. Apres verification de l'utilisateur email et mot de pass hashe conforment celui de la base de donne l'api backend nous renvoi un jwtTokent qui code les info du user enregistre sur le localStorage qui va nous permettre de joindre les endpoints transactions du user
2. Register: Creation d'un utilisateur dans la base de donnee avec hashage du password avec bcrypt

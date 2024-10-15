import React from 'react'

const Explication = () => {
    return (
        <div className='flex h-screen items-center justify-center' >
            <div className='w-[90%] rounded-lg md:w-[60%] h-[90%] border shadow-xl' >
                <h2 className='text-gray-900 text-center my-4 font-bold text-4xl' >Explication & Choix</h2>
                <div className='p-8' >
                    <h3 className='text-blue-600 text-xl font-semibold' >Choix techniques</h3>
                    <ul>
                        <li className='text-gray-900 mt-4' >1 - J{"'"}ai choisi Next.js 14 avec TypeScript comme technologies principales pour ce projet.</li>
                        <li className='text-gray-900 mt-4' >2 - <strong>
                            Gestion des données via Local Storage:
                        </strong>
                            <p className='text-gray-900 mt-2'  > Sauvegarde initiale : Lors du chargement initial de {"l'application"}, je vérifie si des tâches existent dans local storage. Si des tâches sont présentes, elles sont affichées ; sinon, une liste vide est créée, permettant ainsi à {"l'utilisateur"} de commencer à ajouter des tâches.</p>
                            <p className='text-gray-900 mt-2' > Mise à jour et suppression : Les tâches sont modifiables et peuvent être supprimées facilement, avec les changements immédiatement reflétés dans local storage.</p>
                        </li>
                        <li className='text-gray-900 mt-4' >
                            3 - <strong>Authentification des Utilisateurs avec Local Storage & useContext</strong>
                        </li>
                        <li className='text-gray-900 mt-4' >
                            4 -<strong>( useState, useEffect, useReducer, useContext, TailwindCSS, Ant Design, React Hook Form )</strong>
                        </li>
                    </ul>
                    <h3 className='text-blue-600 mt-4 text-xl font-semibold' >Défis rencontrés</h3>
                    <ul>
                        <li className='text-gray-900 mt-4' >
                            1 - <strong>Non-persistence des Données:</strong>
                            <p className='text-gray-900 mt-2' >
                                <strong> Problème : </strong> JSONPlaceholder est une API de test qui ne persiste pas réellement les données. Les opérations POST, PUT et DELETE renvoient des réponses réussies, mais les modifications ne sont pas sauvegardées côté serveur. Cela signifie que les données ne sont pas réellement mises à jour, ce qui pose un problème pour une application nécessitant la sauvegarde et la gestion persistante des tâches.
                            </p>
                            <p className='text-gray-900 mt-2' >
                                <strong> Conséquence  : </strong>  Les utilisateurs ne voient pas les modifications {"qu'ils"} apportent après une actualisation de la page, rendant {"l'expérience"} utilisateur incohérente et frustrante.
                            </p>
                        </li>
                    </ul>
                    <h3 className='text-blue-600 mt-4 text-xl font-semibold' >Solutions Apportées :</h3>
                    <ul>
                        <li className='text-gray-900 mt-4' >1 - <strong>Gestion Locale de {"l'État"}</strong>
                            <p>
                           {" j'ai utilisé le hook useReducer de React. Ce choix m'a permis de gérer plus efficacement les actions complexes liées aux tâches, comme l'ajout, la suppression et la modification du statut des tâches. Chaque tâche est stockée dans l'état local et est identifiée par un ID unique généré localement.Avec useReducer, j'ai pu refléter les modifications des tâches en temps réel dans l'interface utilisateur, en synchronisant l'état de l'application avec LocalStorage."}
                            </p>
                        </li>
                    </ul>
                    <h3 className='text-blue-600 mt-4 text-xl font-semibold' >Conclusion</h3>
                    <ul>
                        <li className='text-gray-900 mt-2'>
                            {"Ce projet de Todo-App m'a offert une opportunité précieuse de mettre en pratique mes connaissances en développement web moderne."}
                        </li>
                        <li className='text-gray-900 mt-2'>
                           {" Cette expérience m'a permis de renforcer mes compétences en React"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Explication
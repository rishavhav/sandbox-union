import React from "react"
import myImage from "../assets/img.png"
const GameRules = () => {
  return (
    <div className="flex justify-center">
      <a href="#" class=" flex flex-col items-center  bg-white border border-gray-200 rounded-lg shadow-2xl md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded h-96 md:h-auto md:w-48 " src={myImage} alt="xyz" />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Rules of the game</h5>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">🥊 Enter number of wrestlers. It should be [0-4]</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">🥊 Fill the form for each wrestler. Name, Health and Move can't be empty. It will show alert if you do!</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">🥊 Negative Health or Move Damage will throw alert!</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">🥊 Once all set click 'Begin Tournament' and enjoy! 😁</p>
        </div>
      </a>
    </div>
  )
}

export default GameRules

<?php

use \App\Room;
use Illuminate\Database\Seeder;

class RoomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for($i = 0; $i < mt_rand(8,15); $i++) {
            $floor = mt_rand(1, 30);
            Room::create([
                'number'   => str_pad($floor . mt_rand(1, 99),4, '0') . mb_strtoupper($faker->randomLetter),
                'capacity' => mt_rand(3, 7),
                'floor'    => $floor,
            ]);
        }
    }
}

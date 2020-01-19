<?php

use \App\Visitor;
use Illuminate\Database\Seeder;

class VisitorsTableSeeder extends Seeder
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
            Visitor::create([
                'name'          => $faker->firstName(),
                'document'      => mt_rand(100,999).mt_rand(100,999).mt_rand(100,999).mt_rand(10,99),
                'date_of_birth' => $faker->date(),
                'email'         => $faker->email,
            ]);
        }

    }
}

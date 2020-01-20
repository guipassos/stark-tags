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

        $cpf = [
            '99396165034', '90576922013', '52973666074',
            '59379640048', '92901027059', '65268322028',
            '08758080007', '10088636020', '13398487084',
            '57981887011', '07029856007', '41123996008',
            '44854761032', '38617865083', '06829764076',
        ];

        for($i = 0; $i < mt_rand(8,15); $i++) {
            Visitor::create([
                'name'          => $faker->firstName(),
                'document'      => $cpf[array_rand($cpf, 1)],
                'date_of_birth' => \Carbon\Carbon::parse($faker->date())->format('d/m/Y'),
                'email'         => $faker->email,
            ]);
        }

    }
}

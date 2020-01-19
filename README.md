# Stark Access Tags

Stark Access Tags is a project to management  entry / exit of people in the Stark Tower.

### Stack of project

```
PHP (7.3.13) - MariaDB 
Angular 8

This project is compatible with all databases supported by laravel
```


    
### Fire up project

#### Configure the docker images

In this project I'm using  devilbox docker images. You can see more details about the devilbox at the links:

* [Devilbox Project](http://devilbox.org/)
* [Install Devilbox](https://devilbox.readthedocs.io/en/latest/getting-started/install-the-devilbox.html)
* [Setup to Laravel](https://devilbox.readthedocs.io/en/latest/examples/setup-laravel.html)

Basically you must clone devilbox repository, configure the "env" file and run "docker-compose up".

The first time you run the command, it will download and install all images and dependencies, which may take a while.

If everything went well, you will have a php server running on your local machine.

Then, you must download the git repository from Stark Access Tags into devilbox/data/www and configure the virtual hosts.

[Configure Virtual Hosts](https://devilbox.readthedocs.io/en/latest/examples/setup-laravel.html#create-new-vhost-directory)

### Run API
Configure the laravel .env file to point to your database, and execute below commands:

``` console
composer install
php artisan migrate:fresh --seed
```
### API's Endpoints

[Link to Endpoints](https://documenter.getpostman.com/view/1470157/SWT5gzuE)



### Build and Run Frontend

* Clone Frontend repository.
* Run `npm install` to get dependencies.
* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



### Objectives

* Cadastrar novos visitantes contendo os dados: Nome, CPF, Sala destino, data de nascimento e e-mail sendo que Sala destino, CPF e Nome são obrigatórios
* Cada sala pode ter no máximo 3 visitantes ativos
* Listar os visitantes que ainda estão na torre e ter a possibilidade de registrar a saída;
* Listar todo o histórico de visitantes (entradas e saídas)
* Armazenar os Logs de utilização do sistema
* Autenticação



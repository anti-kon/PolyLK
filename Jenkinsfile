pipeline {
    agent any
    tools {
        gradle 'Gradle-8.7'
    }
    environment {
        CI = false          // do not treat warnings as errors
    }
    stages {
        stage("Verify tooling") {
            steps {
                sh '''
                    docker version
                    docker info
                    docker compose version
                    curl --version
                    jq --version
                    gradle --version
                '''
            }
        }
        stage('Prune Docker data') {
            steps {
                sh 'docker system prune -a --volumes -f'
                sh 'docker compose down --remove-orphans -v'
                sh 'docker compose ps'
            }
        }
        stage('Java microservices build') {
            steps {
                dir('microservices/eureka_server') {
                    sh 'gradle build'
                }
                dir('microservices/api_gateway') {
                    sh 'gradle build'
                }
            }
        }
        stage('Build frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Scripts access rights') {
            steps {
                dir('microservices/api_gateway') {
                    sh 'chmod +x wait-for-it.sh'
                }
                dir('microservices/authorization') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
                dir('microservices/info_person') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
                dir('microservices/news') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
                dir('microservices/posts') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
                dir('microservices/queues') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
                dir('microservices/registration') {
                    sh 'chmod +x wait-for-it.sh'
                    sh 'chmod +x start.sh'
                }
            }
        }
        stage('Build container') {
            steps {
                sh 'docker compose logs -f -t'
                sh 'docker compose --env-file .env build'
            }
        }
        stage('Start docker containers') {
            steps {
                sh 'docker compose logs -f -t'
                sh 'docker compose --env-file .env up -d'
                sh 'docker compose ps'
            }
        }
    }
}

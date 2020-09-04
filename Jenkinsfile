node {

    /* The first stage clones our code repository */
    stage('Clone repository') {
        checkout scm rss-frontend
    }

    /* The second stage runs Maven to package the app */
    stage('Package') {
        sh 'mvn package -DskipTests'
    }

    /* The final stage runs Maven to deploy the JAR into a repository */
    stage('Deploy') {
        sh 'mvn deploy -DskipTests'
    }

}

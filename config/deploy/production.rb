server ENV['DEPLOY_SERVER'], user: ENV['DEPLOY_USER'], roles: %w{app db web}
set :deploy_to, ENV['DEPLOY_PATH']
set :ssh_options, keys: ["config/deploy_id_rsa"] if File.exist?("config/deploy_id_rsa")

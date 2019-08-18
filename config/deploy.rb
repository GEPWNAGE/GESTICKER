# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "gesticker"
set :repo_url, "https://github.com/GEPWNAGE/GESTICKER.git"

set :stages, %w(production)
set :deploy_via, :remote_cache
set :use_sudo, false
set :default_run_options, {:pty => true}
set :copy_exclude, %w(/.git /README.md /Capfile /phpunit.xml.dist)
set :pty, true
set :keep_releases, 5
set :branch, `git rev-parse HEAD`.chomp
append :linked_files, 'server/.env'
append :linked_dirs, 'server/data'
append :linked_dirs, 'server/public/uploads'

Rake::Task['deploy:updated'].prerequisites.delete('composer:install')
SSHKit.config.command_map[:composer] = "php #{shared_path.join("composer.phar")}"

task :sticker_server do
  on roles(:web) do
    execute "cd #{release_path}/server && composer install"
  end
end

task :sticker_client do
  on roles(:web) do
    execute "cd #{release_path}/client && yarn && yarn run build:production"
  end
end


after 'deploy:starting', 'composer:install_executable'
after 'deploy:updated', 'sticker_server'
after 'deploy:updated', 'sticker_client'

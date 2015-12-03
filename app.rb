require 'sinatra'

require 'haml'
require 'sass'

get '/' do
  @mes = "Hello!"
  haml :index
end

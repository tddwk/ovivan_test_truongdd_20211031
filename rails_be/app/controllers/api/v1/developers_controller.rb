class Api::V1::DevelopersController < ApplicationController
  before_action :set_developer, only: [:show, :update, :destroy]

  def index
    @developers = Developer.all.includes(:projects)

    render json: @developers
  end

  def show
    render json: @developer
  end

  def create
    @developer = Developer.new(developer_params)

    if @developer.save
      render json: @developer, status: :created
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  def update
    if @developer.update(developer_params)
      render json: @developer
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @developer.destroy
      render json: @developer
    else
      render json: @developer.errors, status: :unprocessable_entity
    end
  end

  private
    def set_developer
      @developer = Developer.find(params[:id])
    end

    def developer_params
      params.require(:developer).permit(:first_name, :last_name)
    end
end

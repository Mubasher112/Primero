# frozen_string_literal: true

# Main API controller for Incident records
class Api::V2::PreventionsController < ApplicationApiController
  include Api::V2::Concerns::Pagination
  include Api::V2::Concerns::Record

  private

  def authorize_create!
    can_create = current_user.can?(:create, Prevention)
    raise Errors::ForbiddenOperation unless can_create
  end

  def find_record
    model_query = model_class
    # TODO: Should check the module param to determine if mrm, not the user's module.
    if current_user.module?(PrimeroModule::MRM)
      model_query = model_class
    end
    record = model_query.find(params[:id])
    # Alias the record to a more specific name: @child, @incident, @tracing_request
    instance_variable_set("@#{model_class.name.underscore}", record)
  end
end

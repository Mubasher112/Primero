# frozen_string_literal: true

# Model representing an event. Some events are correlated to a case, forming a historical record.
# rubocop:disable Metrics/ClassLength
class Prevention < ApplicationRecord
  include Record
  include Searchable
  include Historical
  include Ownable
  include Flaggable
  include Alertable
  include Attachable
  include EagerLoadable
  include Webhookable
  include Kpi::GBVIncident
  include ReportableLocation
  include GenderBasedViolence
  include MonitoringReportingMechanism
  include LocationCacheable

  store_accessor(
    :data,
    :unique_id, :prevention_id, :preventionid_ir, :individual_ids, :prevention_code, :description, :super_prevention_name,
    :prevention_detail_id, :prevention_description, :monitor_number, :survivor_code, :date_of_first_report,
    :date_of_prevention_date_or_date_range, :prevention_date, :date_of_prevention, :date_of_prevention_from,
    :date_of_prevention_to, :individual_details_subform_section, :prevention_location,
    :health_medical_referral_subform_section, :psychosocial_counseling_services_subform_section,
    :legal_assistance_services_subform_section, :police_or_other_type_of_security_services_subform_section,
    :livelihoods_services_subform_section, :child_protection_services_subform_section, :violation_category,
    :prevention_date_end, :is_prevention_date_range
  )

  class << self
    def filterable_id_fields
      %w[prevention_id prevntion_code monitor_number survivor_code preventionid_ir short_id]
    end

    def quicksearch_fields
      filterable_id_fields + %w[super_prevention_name prevention_description individual_ids]
    end

    def summary_field_names
      common_summary_fields + %w[
        date_of_interview date_of_prevention violence_type
        prevention_location violations social_worker date_of_first_report
        cp_prevention_violence_type reporting_location_hierarchy
        gbv_sexual_violence_type prevention_date survivor_code
        violation_category prevention_date_derived
      ]
    end

    def sortable_text_fields
      %w[short_id]
    end

    def minimum_reportable_fields
      {
        'boolean' => %w[record_state],
        'string' => %w[status owned_by],
        'multistring' => %w[associated_user_names owned_by_groups],
        'date' => %w[prevention_date_derived]
      }
    end
  end

  searchable do
    date :prevention_date_derived
    date :date_of_first_report
    %w[id status].each { |f| string(f, as: "#{f}_sci") }
    filterable_id_fields.each { |f| string("#{f}_filterable", as: "#{f}_filterable_sci") { data[f] } }
    quicksearch_fields.each { |f| text_index(f) }
    sortable_text_fields.each { |f| string("#{f}_sortable", as: "#{f}_sortable_sci") { data[f] } }
  end

  after_initialize :set_unique_id

  alias super_defaults defaults
  def defaults
    super_defaults
    self.date_of_first_report ||= Date.today
  end

  def set_instance_id
    self.prevention_id ||= unique_identifier
    self.prevention_code ||= prevention_id.to_s.last(7)
  end

  def set_unique_id
    self.unique_id = id
  end

  def prevention_date_derived
    prevention_date || date_of_prevention_from || date_of_prevention
  end

  def reporting_location_property
    'prevention_reporting_location_config'
  end
end
# rubocop:enable Metrics/ClassLength

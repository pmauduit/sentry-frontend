package fr.spironet.sentryfrontend.controllers

import groovy.json.JsonSlurper
import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/issues")
class SentryController {


  @Value('#{environment.SENTRY_TOKEN}')
  private final def SENTRY_TOKEN

  @Value('#{environment.QUERY}')
  private final def QUERY

  private def api_url = "https://sentry.io/api/0"

  private String getIssues(String org, String project, String query) {
    def actualUrlStr = "${api_url}/projects/${org}/${project}/issues/?query=${query} is:unresolved"

    return actualUrlStr.toURL().
            getText(requestProperties: [Authorization: "Bearer ${SENTRY_TOKEN}"])
    }

  @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  def defaultController() {
    def issues = this.getIssues("camptocamp", "georchestra", QUERY)
    def ret = new JsonSlurper().parseText(issues)

    return new ResponseEntity<Object>(ret, HttpStatus.OK)
  }

  @RequestMapping(path="/{issueId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
  def getIssueById(@PathVariable("issueId") String issueId) {
    def issue = "${api_url}/issues/${issueId}/".toURL().
            getText(requestProperties: [Authorization: "Bearer ${SENTRY_TOKEN}"])

    def ret = new JsonSlurper().parseText(issue)
    return new ResponseEntity<Object>(ret, HttpStatus.OK)
  }


}
